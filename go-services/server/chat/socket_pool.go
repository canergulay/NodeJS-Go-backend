package chat

import (
	"errors"

	"github.com/canergulay/goservices/grpc_manager"
)

var (
	clientNotFound = "client not found already"
)

type SocketPool struct {
	Clients          map[string]Client
	ValidationClient grpc_manager.ValidationClient
}

func InitializeSocketPool() SocketPool {
	clients := make(map[string]Client)
	validationClient := grpc_manager.ConnectGRPCServer()
	return SocketPool{Clients: clients, ValidationClient: validationClient}
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
		return errors.New(clientNotFound)
	}
	Client.ReceiveMessage <- message
	return nil
}
