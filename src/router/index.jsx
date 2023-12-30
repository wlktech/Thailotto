import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";

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
                path : '/home',
                element : <HomePage />
            },
            {
                path : '/profile',
                element : <Profile />
            },
            {
                path : '*',
                element : <NotFound />
            }
        ]
    }
])

export default router;