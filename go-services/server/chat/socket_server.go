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
	clientCreated, err := HandleFirstMessageAndInitialiseClient(connection, p)
	if err == nil && clientCreated != nil {
		SP.AddClientToPool(*clientCreated)
		go clientCreated.ReceiveMessageHandler(connection)
		go clientCreated.SendMessageHandler(connection)
		fmt.Printf("USER WITH ID %s HAS SUCCESSFULLY AUTHENTICATED HIMSELF WITH HIS JWT", clientCreated.Id)
	} else {
		connection.Close() // OUR USER COULDN'T VERIFY HIS IDENTITY WITH A VALID JWT THAT HOLDS HIS USERID
	}

}
