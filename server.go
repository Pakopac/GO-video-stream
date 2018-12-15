package main

import (
	"golang.org/x/net/websocket"
	"net/http"
	"log"
	"fmt"
)

func main() {
	link := map[string]interface{}{}
	hub := []*websocket.Conn{}
	http.Handle("/video", websocket.Handler(func(sock *websocket.Conn){
		datas := map[string]interface{}{}
		hub = append(hub, sock)

		for {
			fmt.Println(hub)
				err := websocket.JSON.Receive(sock, &datas)
				if err != nil {
					break
				}
			if datas["link"] != nil {
				link = datas
			}
			for i := range hub {
				fmt.Println("ok")
				err2 := websocket.JSON.Send(hub[i], &link)
				err3 := websocket.JSON.Send(hub[i], &datas)
				if err2 != nil {}
				if err3 != nil {}
			}
		}
		sock.Close()
	}))
	if err :=  http.ListenAndServe(":1234", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}