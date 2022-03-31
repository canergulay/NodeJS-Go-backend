package chat

import (
	"errors"

	"github.com/canergulay/goservices/grpc_manager"
	"gorm.io/gorm"
)

var (
	clientNotFound = "client not found already"
)

type SocketPool struct {
	Clients      map[string]Client
	PGConnection *gorm.DB
	GRPCmanager  grpc_manager.GRPCManager
}

func InitializeSocketPool(db *gorm.DB) SocketPool {
	clients := make(map[string]Client)
	grpcManager := grpc_manager.InitgRPCManager()
	return SocketPool{Clients: clients, PGConnection: db, GRPCmanager: grpcManager}
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

func (sp SocketPool) SendMessageToUser(message ChatMessage) error {
	Client, ok := sp.Clients[message.Receiver]

	if !ok {
		// THAT MEANS OUR USER IS NOT ONLINE.

		return errors.New(clientNotFound)
	}
	Client.ReceiveMessage <- message
	return nil
}
