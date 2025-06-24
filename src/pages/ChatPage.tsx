import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import "./ChatPage.css";
import type { Message } from "../message";
import { Config } from "../config";

export default function ChatPage() {
    const navigate = useNavigate();
    const [name, setName] = React.useState(sessionStorage.getItem("name"));
    const [messages, setMessages] = React.useState<Message[]>([]);
    const ws = React.useRef<WebSocket | null>(null);

    useEffect(() => {
        if (name == null) {
            useEffect(() => {
                navigate("/");
            });
            return;
        }
    }, [name]);

    useEffect(() => {
        ws.current = new WebSocket(`${Config.IP}?name=${name}`);

        ws.current.addEventListener("open", (e) => {
            
        });

        ws.current.addEventListener("message", (e) => {
            console.log(e.data);
            setMessages((m) => [...m, JSON.parse(e.data)]);
        });

        return () => ws.current?.close();
    }, []);

    function handleMessageSend(data: FormData) {
        const message = data.get("message");
        if (message == null || message == "") return;

        ws.current?.send(JSON.stringify({
            type: "text",
            content: message,
        } as Message));
    }

    return (
        <div className="wrapper">
            <div className="profile">Tu esti {name}</div>
            <div className="messages_box">
                {messages.map((m) => {
                    return <div>{m.source}: {m.content}</div>;
                })}
            </div>
            <form className="message_box" action={handleMessageSend}>
                <input name="message" placeholder="Scrie ceva..."></input>
                <button>Trimite</button>
            </form>
        </div>
    );
}