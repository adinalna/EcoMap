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
import CreateTeam from "./views/CreateTeam.jsx";
import JoinTeam from "./views/JoinTeam.jsx";
import LitterGallery from "./views/LitterGallery.jsx";
import LitterTag from "./views/LitterTag.jsx";

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
                        path: '/gallery',
                        element: <LitterGallery />
                    },
                    {
                        path: '/tag',
                        element: <LitterTag />
                    },
                    {
                        path: '/cleanup',
                        element: <Cleanup />
                    },
                    {
                        path: '/createTeam',
                        element: <CreateTeam />
                    },
                    {
                        path: '/joinTeam',
                        element: <JoinTeam />
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