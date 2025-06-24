import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: LoginPage,
        errorElement: <div>404 Not Found</div>,
    },
    {
        path: "/chat",
        Component: ChatPage,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
