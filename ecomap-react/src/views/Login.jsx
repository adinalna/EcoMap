import React, { useState, createRef } from "react"; 
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/UserProvider.jsx";

export default function Login() {
    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.message)
                }
            })
    };

    return (
        <div>
            Login
        </div>
    );
}