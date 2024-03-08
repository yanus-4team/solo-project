import './App.css';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {router} from './routes/router'
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
