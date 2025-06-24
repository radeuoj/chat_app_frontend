export interface Message {
    type: "text" | "error",
    content: string,
    source?: string,
}