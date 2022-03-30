package chat

import (
	"context"
	"fmt"
	"time"

	"github.com/canergulay/goservices/grpc_manager"
	"github.com/gorilla/websocket"
)

var (
	CLOSED_CONNECTION = "CLOSECONNECTION"
)

type Client struct {
	Id             string
	SendMessage    chan string
	ReceiveMessage chan string
}

func (c Client) ReceiveMessageHandler(conn *websocket.Conn) {
	for {
		select {
		case msg := <-c.ReceiveMessage:
			if msg != CLOSED_CONNECTION {
				fmt.Println(c.Id, " soldaki id sagdaki mesaji alacak ", msg)
				conn.WriteMessage(1, []byte(fmt.Sprintf("a message has been sent to you : %s", msg)))
			} else {
				close(c.ReceiveMessage)
				return
			}
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
		SP.SendMessageToUser(messageParsed.Receiver, messageParsed.Message)
	}
}

func HandleFirstMessageAndInitialiseClient(conn *websocket.Conn, message []byte) (*Client, error) {

	token := string(message) // BEING USERID

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()
	response, err := grpc_manager.ConnectGRPCServer().ValidateToken(ctx, &grpc_manager.ValidationRequest{
		Token: token,
	})

	if response.GetIsValid() && err == nil {
		return &Client{
			Id:             response.GetUserid(),
			SendMessage:    make(chan string),
			ReceiveMessage: make(chan string),
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
			c.ReceiveMessage <- CLOSED_CONNECTION
			SP.RemoveClientFromPool(c.Id)
		}
	}
}
