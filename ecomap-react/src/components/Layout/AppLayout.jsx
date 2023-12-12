import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/UserProvider";
import { Button, Navbar, Nav } from 'react-bootstrap';
import CustomNavbar from "./CustomNavbar";

export default function AppLayout() {

    const { user, token, setUser, setToken } = useStateContext();

    return (
        <div className="app-layout">
            <CustomNavbar user={user} token={token}/>
            <Outlet />
        </div>
    );
}
