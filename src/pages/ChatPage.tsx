import React, { use, useEffect } from "react";
import { useNavigate } from "react-router";

import "./ChatPage.css";
import type { UserData, Message } from "../message";
import { Config } from "../config";

export default function ChatPage() {
    const navigate = useNavigate();
    const [name, setName] = React.useState(sessionStorage.getItem("name"));
    const [color, setColor] = React.useState(sessionStorage.getItem("color"));
    const [messages, setMessages] = React.useState<Message[]>([]);
    const userList = React.useRef<UserData[]>([]);
    const ws = React.useRef<WebSocket | null>(null);

    useEffect(() => {
        if (name == null || color == null) {
            useEffect(() => {
                navigate("/");
            });
            return;
        }
    }, [name, color]);

    useEffect(() => {
        ws.current = new WebSocket(`${Config.IP}?name=${name}&color=${color?.substring(1)}`);

        ws.current.addEventListener("open", (e) => {
            
        });

        ws.current.addEventListener("message", (e) => {
            // console.log(e.data);
            const data = JSON.parse(e.data);
            if (data.type == "text") {
                // console.log(userList);
                const user = userList.current.find((u) => u.id == data.source);
                data.source = <span style={{ color: `#${user?.color}` }}>{user?.name} [{user?.id}]</span>;
                setMessages((m) => [...m, data]);
            }
            else if (data.type == "user_list")  {
                userList.current = data.content;
            }
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
                    // console.log(m.source);
                    return <div>{m.source}: {m.content}</div>;
                }).reverse()}
            </div>
            <form className="message_box" action={handleMessageSend} autoComplete="nope">
                <input type="text" name="message" placeholder="Scrie ceva..."></input>
                <button id="send_button" onFocus={(e) => e.relatedTarget && (e.relatedTarget as HTMLElement).focus()}>Trimite</button>
            </form>
        </div>
    );
}