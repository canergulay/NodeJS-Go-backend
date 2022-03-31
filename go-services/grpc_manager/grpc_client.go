package grpc_manager

import (
	"log"

	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var (
	port = ":8081"
)

type GRPCManager struct {
	Connection *grpc.ClientConn
	Client     *ValidationClient
}

func InitgRPCManager() GRPCManager {
	conn := connectGRPCServer()
	client := NewValidationClient(conn)
	return GRPCManager{Connection: conn, Client: &client}
}

func connectGRPCServer() *grpc.ClientConn {

	conn, err := grpc.Dial(port, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf(err.Error())
	}

	return conn
}
