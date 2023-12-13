import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/Layout/DefaultLayout.jsx";
import GuestLayout from "./components/Layout/GuestLayout.jsx";
import AppLayout from "./components/Layout/AppLayout.jsx";
import Login from "../src/views/Login.jsx";
import Signup from "../src/views/Signup.jsx";
import NotFound from "../src/views/NotFound.jsx";
import About from "./views/About.jsx";
import Upload from "./views/Upload.jsx";
import Cleanup from "./views/Cleanup.jsx";
import Litter from "./views/Litter.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <DefaultLayout />,
                children: [
                    {
                        path: '/upload',
                        element: <Upload />
                    },
                    {
                        path: '/litter',
                        element: <Litter />
                    },
                    {
                        path: '/cleanup',
                        element: <Cleanup />
                    }
                ]
            },
            {
                path: '/about',
                element: <About />
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
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])


export default router;