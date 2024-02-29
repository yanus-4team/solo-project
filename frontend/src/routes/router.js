import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import LoginPage from "../pages/Login";

export const router=createBrowserRouter([
    {path:'/',Component:Main},
    {path:'/login',Component:LoginPage},
])