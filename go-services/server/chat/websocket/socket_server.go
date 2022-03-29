package chat

import (
	"fmt"
	"log"
	"net/http"

	"github.com/canergulay/goservices/server/chat/websocket/models"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func WebsocketHandler(w http.ResponseWriter, r *http.Request) {

	upgrader.CheckOrigin = func(r *http.Request) bool { return true} // TO PREVENT CORS ERRORS

    connection, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }


	for{

		var messageParsed models.ChatMessage
		
		err := connection.ReadJSON(&messageParsed)
		
		if err != nil {
			fmt.Println("ERROR !",err)
		}

		fmt.Println(messageParsed.Message)

	}

 
}

