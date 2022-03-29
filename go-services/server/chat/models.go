package chat

type ChatMessage struct {
	Sender   string
	Receiver string
	Message  string
}

type SocketPool struct {
	Clients map[string]Client
}