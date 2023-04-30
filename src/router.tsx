import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "./pages/HomePage/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "",
                element: <HomePage />
            }
        ]
    }
])