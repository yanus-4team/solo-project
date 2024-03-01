import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import LoginPage from "../pages/Login";

export const router=createBrowserRouter([
    {path:'/main',Component:Main},
    {path:'/',Component:LoginPage},
])