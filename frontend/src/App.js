import './App.css';
import {BrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {router} from './routes/router'


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
