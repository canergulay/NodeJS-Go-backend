package chat

import (
	"fmt"

	"github.com/gorilla/websocket"
)

var (
	CLOSED_CONNECTION="CLOSECONNECTION"
)

type Client struct {
	Id             string
	SendMessage    chan string
	ReceiveMessage chan string
}

func (c Client) ReceiveMessageHandler(conn *websocket.Conn) {
	for {
		select{
		case msg := <- c.ReceiveMessage:
			if(msg!=CLOSED_CONNECTION){
				fmt.Println(c.Id," soldaki id sagdaki mesaji alacak ",msg,)
				conn.WriteMessage(1,[]byte(fmt.Sprintf("a message has been sent to you : %s",msg)))
				}else{
				close(c.ReceiveMessage)
				return
			}
		}
	}
}

func (c Client) SendMessageHandler(conn *websocket.Conn){
		for{
			var messageParsed ChatMessage
			err := conn.ReadJSON(&messageParsed)
			if err != nil {
				go c.handleError(err)
				return
			}
			fmt.Println(messageParsed)
			SP.SendMessageToUser(messageParsed.Receiver,messageParsed.Message)
		}
}

func  HandleFirstMessageAndInitialiseClient(conn *websocket.Conn,message []byte) Client{
	
	
	// FIRST MESSAGE WILL BE THE USERID 
	 // LATER ON I WILL SETUP THE AUTHENTICATION FOR IT,
	 // CLIENT WILL SEND ITS JWT TOKEN AS THE FIRST MESSAGE THEN WE WILL VALIDATE AND GET ID FROM IT.
	 // IF NOT VALIDATED AND ID COULDN'T OBTAINED FROM THE JWT TOKEN ( THE FIRST MESSAGE AFTER CONNECTIN )
	 // WE WILL TERMINATE THE WEBSOCKET CONNECTION AND WONT LET THE CLIENT GET IN THE CONNECTED SOCKETSE POOL.
	 // SINCE IT IS NOT A SERIOUS PROJECT AND FOR THE SAKE OF SIMPLICITY, I WILL CONTINUE WITHOUT AUTHENTICATION.
	 // BUT IT IS REALLY EASY TO IMPLEMENT IT LATER ON.
	 
	 userid := string(message) // BEING USERID
	 
	 return Client{
		 Id: userid,
		 SendMessage: make(chan string),
		 ReceiveMessage: make(chan string),
		}

}

func (c Client) handleError(err error){
	// AN ERROR WHILE READING THE MESSAGE POINTS OUT A CONNECTION LOST STATE.
	if ce, ok := err.(*websocket.CloseError); ok {
		switch ce.Code {
		case websocket.CloseNormalClosure,
			websocket.CloseGoingAway,
			websocket.CloseNoStatusReceived:
			fmt.Printf("User with the id %s is leaving.",c.Id)
			c.ReceiveMessage<-CLOSED_CONNECTION
			SP.RemoveClientFromPool(c.Id)
		}
	}
}