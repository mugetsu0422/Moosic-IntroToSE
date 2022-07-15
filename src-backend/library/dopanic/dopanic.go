package dopanic

import (
    "encoding/json"
    "fmt"
    "time"
)

func createMessage(messages []string, at string) string {
    panicMessage, _ := json.Marshal(map[string]interface{}{
        "type": "error",
        "messages": messages,
        "at": at,
        "time": time.Now().String(), 
    })

    return string(panicMessage)
}

func Silent(messages []string, at string) {
    fmt.Printf("%s", createMessage(messages, at))
}

func WithMessage(messages []string, at string) {
    panicMessage := createMessage(messages, at) 
    fmt.Printf("%s", panicMessage)
    panic(panicMessage)
}
