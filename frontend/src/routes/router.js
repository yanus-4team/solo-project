import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import LoginModal from "../components/LoginModal";

export const router=createBrowserRouter([
    {path:'/',Component:Main},
    {path:'/login',Component:Login},
    {path:'/modal',Component:LoginModal},
])