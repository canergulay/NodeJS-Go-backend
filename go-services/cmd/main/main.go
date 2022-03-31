package main

import (
	"log"
	"net/http"

	"github.com/canergulay/goservices/global"
	"github.com/canergulay/goservices/server/chat"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	pgConnection := global.InitPostgreSQL()
	socketPool := chat.InitializeSocketPool(pgConnection)
	socketServer := chat.InitializeSocketServer(socketPool, pgConnection)

	http.HandleFunc("/", socketServer.WebsocketHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
