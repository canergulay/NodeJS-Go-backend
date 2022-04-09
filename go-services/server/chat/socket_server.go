package chat

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/canergulay/goservices/grpc_manager"
	"github.com/gorilla/websocket"
)

type SocketServer struct {
	SP SocketPool
}

var SocketServerCreated SocketServer

func InitializeSocketServer(sp SocketPool) SocketServer {
	SocketServerCreated = SocketServer{SP: sp}
	return SocketServerCreated
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func (s SocketServer) WebsocketHandler(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true } // TO PREVENT CORS ERRORS

	connection, err := upgrader.Upgrade(w, r, nil)
	fmt.Println("WE HAVE A NEW CONNECTION !")
	if err != nil {
		log.Println(err)
		return
	}

	_, p, readError := connection.ReadMessage() // FIRST MESSAGE TO HANDLE AUTHENTICATION

	if readError != nil {
		handleFirstMessageError(connection)
		return
	}

	clientCreated, err := s.HandleFirstMessageAndInitialiseClient(connection, p)

	if err == nil && clientCreated != nil {
		s.SP.AddClientToPool(*clientCreated)

		go clientCreated.ReceiveMessageHandler(connection)
		go clientCreated.SendMessageHandler(connection)
	} else {
		connection.Close() // OUR USER COULDN'T VERIFY HIS IDENTITY WITH A VALID JWT THAT HOLDS HIS USERID
	}

}

func (server SocketServer) HandleFirstMessageAndInitialiseClient(conn *websocket.Conn, message []byte) (*Client, error) {

	token := string(message) // BEING USERID
	fmt.Println(token)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	response, err := (*server.SP.GRPCmanager.Client).ValidateToken(ctx, &grpc_manager.ValidationRequest{
		Token: token,
	})

	if response.GetIsValid() && err == nil {
		defer sayUserHI(conn)
		fmt.Println(response)
		client := Client{
			Id:             response.GetUserid(),
			SendMessage:    make(chan ChatMessage),
			ReceiveMessage: make(chan ChatMessage),
			SP:             &server.SP,
		}
		fmt.Println(client.Id)
		return &client, nil
	}
	return nil, err

}

func handleFirstMessageError(connection *websocket.Conn) {
	log.Println(FIRST_MESSAGE_ERROR)
	connection.WriteMessage(1, []byte(FIRST_MESSAGE_ERROR))
	connection.Close()
}
