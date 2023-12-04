import React, { useState, createRef } from "react"; 
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/UserProvider.jsx";

export default function Signup() {
    const usernameRef = createRef()
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)
  
    const onSubmit = ev => {
      ev.preventDefault()
  
      const payload = {
        username: usernameRef.current.value,
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      }
      axiosClient.post('/signup', payload)
        .then(({ data }) => {
          setUser(data.user)
          setToken(data.token);
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  
    return (
        <div>
            Signup
        </div>
    );
}