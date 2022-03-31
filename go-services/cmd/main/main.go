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

	socketServer := chat.InitializeSocketServer(chat.InitializeSocketPool(), global.InitPostgreSQL())

	http.HandleFunc("/", socketServer.WebsocketHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
