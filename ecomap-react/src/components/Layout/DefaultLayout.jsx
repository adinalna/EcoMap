import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/UserProvider";

export default function DefaultLayout() {

    const { user, token, setUser, setToken } = useStateContext();

    let content;

    if (!token) {
        content = <Navigate to="/login" />;
    } else {
        content = (
            <div className="defaultLayout">
               <Outlet />
            </div>
        );
    }

    return content;
}
