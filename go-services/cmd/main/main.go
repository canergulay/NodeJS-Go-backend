package main

import (
	"log"
	"net/http"

	"github.com/canergulay/goservices/server/chat"
)

func main() {

	http.HandleFunc("/", chat.WebsocketHandler)
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
