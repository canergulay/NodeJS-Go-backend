package chat

import (
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

	_, p, readError := connection.ReadMessage() // FIRST MESSAGE TO HANDLE AUTHENTICATION

	if readError != nil {
		handleFirstMessageError(connection)
		return
	}

	clientCreated, err := HandleFirstMessageAndInitialiseClient(connection, p)

	if err == nil && clientCreated != nil {
		SP.AddClientToPool(*clientCreated)
		go clientCreated.ReceiveMessageHandler(connection)
		go clientCreated.SendMessageHandler(connection)
	} else {
		connection.Close() // OUR USER COULDN'T VERIFY HIS IDENTITY WITH A VALID JWT THAT HOLDS HIS USERID
	}

}

func handleFirstMessageError(connection *websocket.Conn) {
	log.Println(FIRST_MESSAGE_ERROR)
	connection.WriteMessage(1, []byte(FIRST_MESSAGE_ERROR))
	connection.Close()
}
