package main

import (
	"golang.org/x/net/websocket"
	"net/http"
	"log"
	"fmt"
)

func main() {
	fmt.Println()
	hub := []*websocket.Conn{}
	http.Handle("/video", websocket.Handler(func(sock *websocket.Conn) {
		datas := map[string]interface{}{}
		hub = append(hub, sock)

		for {
			err := websocket.JSON.Receive(sock, &datas)
			if err != nil {
				break
			}
			for i := range hub {
				err2 := websocket.JSON.Send(hub[i], &datas)
				if err2 != nil {
				}
			}
		}
		sock.Close()
	}))
	//if err :=  http.ListenAndServeTLS(":8443", "/etc/letsencrypt/live/pakopac.me/fullchain.pem", "/etc/letsencrypt/lrypt/live/pakopac.me/privkey.pem", nil); err != nil {
	if err :=  http.ListenAndServe(":1234", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}