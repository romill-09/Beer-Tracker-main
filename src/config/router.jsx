import { createBrowserRouter, Outlet } from "react-router-dom";
import Signup from "../components/Signup";
import Req from "../components/Req";
import Tracker from "../components/Tracker";
import Login from "../components/Login";

const router = createBrowserRouter([
    {
        path: "/signup",
        
        element: <Signup/>,
        exact: true,
    },
    {
        path: "/req",
        element: <Req/>,
        exact: true,
    },
    {
        path: "/",
        element: <Signup/>,
        exact: true,
    },
    {
        path: "/tracker",
        element: <Tracker/>,
        exact: true,
    },
    {
        path: "/login",
        element: <Login/>,
        exact: true,
    },
    
    
]);

export default router;