package chat

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

var (
	CLOSED_CONNECTION = "CLOSECONNECTION"
)

type Client struct {
	Id             string
	SendMessage    chan ChatMessage
	ReceiveMessage chan ChatMessage
	SP             *SocketPool
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

		// WE SHOULD NOTIFY OUR CLIENT THAT WE RECEIVED THE MESSAGE WHICH WILL BE CONVEYED TO RECEIVER.
		// FOR THE SAKE OF THE SIMPLICITY, I WON'T CREATEA NOTHER CHANNEL FOR SUCCESS RESPONSES.
		// SIMPLY, THE RETURN MESSAGE WILL BE A NORMAL CHAT MESSAGE FROM server TO OUR  CLIENT THAT SAYS 'success'
		c.ReceiveMessage <- ChatMessage{Sender: "server", Message: "success"}

		message := ChatMessage{Sender: c.Id, Receiver: messageParsed.Receiver, Message: messageParsed.Message, ConversationId: messageParsed.ConversationId}
		fmt.Println("deneyelim bakalim :")
		fmt.Println(message)
		fmt.Println(messageParsed)
		c.SP.SendMessageToUser(message)
	}
}

func sayUserHI(conn *websocket.Conn) {
	conn.WriteMessage(1, []byte("You are connected successfully !"))
}

func (c Client) handleError(err error) {
	// AN ERROR WHILE READING THE MESSAGE POINTS OUT A CONNECTION LOST STATE.
	if ce, ok := err.(*websocket.CloseError); ok {
		fmt.Println(ce, " buradasin !!")
		switch ce.Code {
		case websocket.CloseNormalClosure,
			websocket.CloseGoingAway,
			websocket.CloseAbnormalClosure,
			websocket.CloseNoStatusReceived:
			c.closeChannelsAndRemoveClient()
		}
	}
}

func (c Client) closeChannelsAndRemoveClient() {
	fmt.Printf("User with the id %s is leaving.", c.Id)
	c.SP.RemoveClientFromPool(c.Id)
	close(c.ReceiveMessage)
	close(c.SendMessage)
}
