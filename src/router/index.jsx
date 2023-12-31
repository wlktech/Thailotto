import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import EditForm from "../pages/Profile/EditForm";

let auth = localStorage.getItem('token');

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            // Conditional Login Route
            ...(localStorage.getItem('token') ? [] : [{
                path: '/login',
                element: <Login />
            },{
                path: '/register',
                element: <Register />
            }]),
            {
                path : '/home',
                element : <HomePage />
            },
            {
                path : '/profile',
                element : <Profile />
            },
            {
                path : '/profile/editProfile',
                element : <EditForm />
            },
            {
                path : '*',
                element : <NotFound />
            }
        ]
    }
])

export default router;