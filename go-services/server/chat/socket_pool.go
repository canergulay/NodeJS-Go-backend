package chat

import "errors"

var (
	clientNotFound = "client not found already"
)

type SocketPool struct {
	Clients map[string]Client
}

func InitializeSocketPool() SocketPool {
	clients := make(map[string]Client)
	return SocketPool{Clients: clients}
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


func (sp SocketPool) SendMessageToUser(id string,message string) error {
	Client, ok := sp.Clients[id]
	
	if !ok {
		return errors.New(clientNotFound)
	}
	Client.ReceiveMessage <- message
	return nil
}