package main

import (
	"log"
	"net/http"

	chat "github.com/canergulay/goservices/server/chat/websocket"
)

func main() {

	http.HandleFunc("/echo", chat.WebsocketHandler)
	log.Fatal(http.ListenAndServe("localhost:8080",nil))
}
