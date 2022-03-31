package chat

import (
	"errors"
	"fmt"

	"github.com/canergulay/goservices/grpc_manager"
	"github.com/canergulay/goservices/server/persistance"
	"gorm.io/gorm"
)

var (
	clientNotFound = "client not found already"
)

type SocketPool struct {
	Clients          map[string]Client
	PGConnection     *gorm.DB
	GRPCmanager      grpc_manager.GRPCManager
	MessagePersister persistance.MessagePersister
}

func InitializeSocketPool(db *gorm.DB) SocketPool {
	clients := make(map[string]Client)
	grpcManager := grpc_manager.InitgRPCManager()
	mpersister := persistance.InitializeMessagePersister(&grpcManager)
	return SocketPool{Clients: clients, PGConnection: db, GRPCmanager: grpcManager, MessagePersister: mpersister}
}

func (sp SocketPool) AddClientToPool(client Client) {
	sp.Clients[client.Id] = client
}

func (sp SocketPool) RemoveClientFromPool(id string) error {

	Client, ok := sp.Clients[id]

	if !ok {
		return errors.New(clientNotFound)
	}

	delete(sp.Clients, id)
	close(Client.ReceiveMessage)
	close(Client.SendMessage)

	return nil
}

func (sp SocketPool) SendMessageToUser(message ChatMessage) {
	Client, ok := sp.Clients[message.Receiver]
	fmt.Println(Client, ok)
	if !ok {
		// THAT MEANS OUR USER IS NOT ONLINE , WE HAVE TO PERSIST THE MESSAGE.
		// WE WILL SEND THE MESSAGE TO THE API GATEWAY WHICH WILL PERSIST AND NOTIFY THE USER.
		persistMessage(message, true, sp) // TRUE --> send notification to the user that he / she has new messages.
		return
	}
	Client.ReceiveMessage <- message
	persistMessage(message, false, sp) // FALSE --> he / seis online and able to see the message, no need for notification.

}

func persistMessage(message ChatMessage, notify bool, sp SocketPool) {
	sp.MessagePersister.PersistMessageFourOflineUser(
		message.Sender,
		message.Receiver,
		message.Message,
		message.ConversationId,
		notify,
	)
}
