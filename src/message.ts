import type { JSX } from "react";

export interface Message {
    type: "text" | "error",
    content: string,
    source?: JSX.Element | number,
}

export interface UserData {
    id: number;
    name: string;
    color: string;
}