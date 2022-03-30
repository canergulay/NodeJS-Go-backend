package chat

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var SP = InitializeSocketPool()

func WebsocketHandler(w http.ResponseWriter, r *http.Request) {

	upgrader.CheckOrigin = func(r *http.Request) bool { return true } // TO PREVENT CORS ERRORS

	connection, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
		return
	}

	_, p, readError := connection.ReadMessage()

	if readError != nil {
		fmt.Println("unexpected read error")
	}

	clientCreated := HandleFirstMessageAndInitialiseClient(connection, p)
	SP.AddClientToPool(clientCreated)

	go clientCreated.ReceiveMessageHandler(connection)
	go clientCreated.SendMessageHandler(connection)

}
