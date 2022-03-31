package chat

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/canergulay/goservices/grpc_manager"
	"github.com/gorilla/websocket"
)

var (
	CLOSED_CONNECTION = "CLOSECONNECTION"
)

type Client struct {
	Id             string
	SendMessage    chan ChatMessage
	ReceiveMessage chan ChatMessage
	CloseClient    chan bool
}

func (c Client) ReceiveMessageHandler(conn *websocket.Conn) {
	for {
		select {
		case msg := <-c.ReceiveMessage:
			messageJSON, err := json.Marshal(msg)
			if err != nil {
				log.Println("An error has occured when tried to parse message, ", err, msg)
				break
			}
			conn.WriteMessage(1, messageJSON)
		case <-c.CloseClient:
			close(c.ReceiveMessage)
			close(c.CloseClient)
		}
	}
}

func (c Client) SendMessageHandler(conn *websocket.Conn) {
	for {
		var messageParsed ChatMessage
		err := conn.ReadJSON(&messageParsed)
		if err != nil {
			go c.handleError(err)
			return
		}
		fmt.Println(messageParsed)
		message := ChatMessage{Sender: c.Id, Receiver: messageParsed.Receiver, Message: messageParsed.Message}
		SP.SendMessageToUser(message)
	}
}

func HandleFirstMessageAndInitialiseClient(conn *websocket.Conn, message []byte) (*Client, error) {

	token := string(message) // BEING USERID
	fmt.Println(token)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	response, err := grpc_manager.ConnectGRPCServer().ValidateToken(ctx, &grpc_manager.ValidationRequest{
		Token: token,
	})
	fmt.Println(response, " response here", err)

	if response.GetIsValid() && err == nil {

		return &Client{
			Id:             response.GetUserid(),
			SendMessage:    make(chan ChatMessage),
			ReceiveMessage: make(chan ChatMessage),
		}, nil
	}

	return nil, err

}

func (c Client) handleError(err error) {
	// AN ERROR WHILE READING THE MESSAGE POINTS OUT A CONNECTION LOST STATE.
	if ce, ok := err.(*websocket.CloseError); ok {
		switch ce.Code {
		case websocket.CloseNormalClosure,
			websocket.CloseGoingAway,
			websocket.CloseNoStatusReceived:
			fmt.Printf("User with the id %s is leaving.", c.Id)
			c.CloseClient <- true
			SP.RemoveClientFromPool(c.Id)
		}
	}
}
