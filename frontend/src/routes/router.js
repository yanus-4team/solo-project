import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Main/Index";
import LoginPage from "../pages/Login";
import ServicePage from "../pages/Service";

export const router=createBrowserRouter([
    {path:'/',Component:Index},
    {path:'/login',Component:LoginPage},
    {path:'/service',Component:ServicePage}
])