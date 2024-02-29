import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import LoginPage from "../pages/Login";

export const router=createBrowserRouter([
    {path:'/',Component:MainPage},
    {path:'/login',Component:LoginPage},
])