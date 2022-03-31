package persistance

import (
	"github.com/canergulay/goservices/server/chat"
	"google.golang.org/grpc"
)

type MessagePersister struct {
	grpcConnection *grpc.ClientConn
}

func PersistMessageFourOflineUser(message chat.ChatMessage) {

}
