import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/Layout/DefaultLayout.jsx";
import GuestLayout from "./components/Layout/GuestLayout.jsx";
import Login from "../src/views/Login.jsx";
import Signup from "../src/views/Signup.jsx";
import NotFound from "../src/views/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/about',
                element: <Login />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])


export default router;