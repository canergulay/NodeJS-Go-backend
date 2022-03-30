package grpc_manager

import (
	"log"

	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var (
	port = ":8081"
)

func ConnectGRPCServer() ValidationClient {

	conn, err := grpc.Dial(port, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf(err.Error())
	}

	validationClient := NewValidationClient(conn)

	return validationClient
}
