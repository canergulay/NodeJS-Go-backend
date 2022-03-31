package persistance

import (
	"context"
	"log"
	"time"

	"github.com/canergulay/goservices/grpc_manager"
)

type MessagePersister struct {
	GRPCManager *grpc_manager.GRPCManager
}

func InitializeMessagePersister(manager *grpc_manager.GRPCManager) MessagePersister {
	return MessagePersister{GRPCManager: manager}
}

func (persister MessagePersister) PersistMessageFourOflineUser(sender string, receiver string, message string, conversationId string, notify bool) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	response, err := (*persister.GRPCManager.Client).SaveMassage(ctx, &grpc_manager.ChatMessage{
		Sender:         sender,
		Receiver:       receiver,
		Message:        message,
		ConversationId: conversationId,
		Notify:         notify,
	})

	if err != nil {
		log.Println(response.GetIsOkey(), err)
	}

}
