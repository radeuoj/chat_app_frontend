import React from "react";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();

    function handleLogin(data: FormData) {
        if (data.get("name") == "") return

        sessionStorage.setItem("name", data.get("name") as string);
        navigate("/chat");
    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
    }}>
        <div>Login here</div>
        <form action={handleLogin} style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
        }}>
            <input name="name" defaultValue={sessionStorage.getItem("name") || ""} placeholder="Nume" />
            <button>Go to chat!</button>
        </form>
    </div>;
}