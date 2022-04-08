package chat

import (
	"errors"
	"fmt"

	"github.com/canergulay/goservices/grpc_manager"
	"github.com/canergulay/goservices/server/persistance"
)

var (
	clientNotFound = "client not found already"
)

type SocketPool struct {
	Clients          map[string]Client
	GRPCmanager      grpc_manager.GRPCManager
	MessagePersister persistance.MessagePersister
}

func InitializeSocketPool() SocketPool {
	clients := make(map[string]Client)
	grpcManager := grpc_manager.InitgRPCManager()
	mpersister := persistance.InitializeMessagePersister(&grpcManager)
	return SocketPool{Clients: clients, GRPCmanager: grpcManager, MessagePersister: mpersister}
}

func (sp SocketPool) AddClientToPool(client Client) {
	sp.Clients[client.Id] = client
}

func (sp SocketPool) RemoveClientFromPool(id string) error {

	_, ok := sp.Clients[id]

	if !ok {
		return errors.New(clientNotFound)
	}

	delete(sp.Clients, id)
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
	// he / she is online.
	// we have to check conversationId before moving on since if it is empty, we should get it from the rpc server when we persist the message.
	if len(message.ConversationId) > 0 {
		Client.ReceiveMessage <- message
		persistMessage(message, false, sp)
	} else {
		result := persistMessage(message, false, sp)
		if result.GetIsOkey() {
			message.ConversationId = result.GetConversationId()
			Client.ReceiveMessage <- message
		}
	}

}

func persistMessage(message ChatMessage, notify bool, sp SocketPool) *grpc_manager.SaveChatMessageResult {
	return sp.MessagePersister.PersistMessageFourOflineUser(
		message.Sender,
		message.Receiver,
		message.Message,
		message.ConversationId,
		notify,
	)
}
