import React from "react";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();

    function handleLogin(data: FormData) {
        if (data.get("name") == "") return
        sessionStorage.setItem("name", data.get("name") as string);
        sessionStorage.setItem("color", data.get("color") as string);
        navigate("/chat");
    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <div>Login here</div>
        <form action={handleLogin} style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
        }}>
            <div><input name="name" defaultValue={sessionStorage.getItem("name") || ""} placeholder="Nume" /></div>
            <div>
                <input name="color" type="color" style={{ margin: "0.4rem" }} defaultValue={sessionStorage.getItem("color") || "#000000"} />
                <label htmlFor="color">Culoare preferata</label>
            </div>
            <button>Go to chat!</button>
        </form>
    </div>;
}