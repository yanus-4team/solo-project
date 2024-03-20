import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Form from "../pages/Form";

export const router=createBrowserRouter([
    {path:'/',Component:Main},
    {path:'/login',Component:Login},
    {path:'/myPage',Component:Form},
])