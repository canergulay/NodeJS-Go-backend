package chat

type ChatMessage struct {
	Sender         string `json:"sender"`
	Receiver       string `json:"receiver"`
	Message        string `json:"message"`
	ConversationId string `json:"conversationId"`
}
