import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from "../pages/Login";
import Blog from "../pages/Blog";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '/blogs',
                element : <Blog />
            },
            {
                path : '*',
                element : <NotFound />
            }
        ]
    }
])

export default router;