import React, { useState } from "react";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  
  axios.post('http://localhost:3001/login', { email, password })
    .then(response => {
      localStorage.setItem('userName', response.data.name);

      toast.success("Login Successfully");
      setTimeout(() => navigate('/Dashboard'), 1000);
    })
    .catch(error => {
      setMessage(error.response.data);
    });
};


  const responseFacebook = (response) => {
    if (response.accessToken) {
      console.log("Facebook login response:", response);
      navigate("/Dashboard");
    } else {
      console.error("Facebook login failed:", response);
    }
  };
  

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        toast.success("User Logged in Successfully", {
          position: "top-center",
        });
       navigate("/Dashboard");
      }
    });
  }

  return (
    <>   
     <div className="container">
      <div className="container-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="container-form">
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder="Email"  value={email}
            onChange={(e) => setEmail(e.target.value)} required />
            <MdEmail className="icon" />
          </div>
          <div className="container-form">
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
            />
            <RiLockPasswordFill className="icon" />
          </div>
         
          {message && <p style={{ color: 'red' }}>{message}</p>}
          <button className="btn" type="submit">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account ? <a href="/Register">Register</a>
            </p>
          </div>
        </form>
        <div className="auth">
          <button className="btn2">
            <FaPhone className="ic" />
            <div className="line"></div>
          </button>
        </div>
        <div className="auth" onClick={googleLogin}>
          <button className="btn2">
            <BsGoogle className="ic" />
            <div className="line"></div>
          </button>
        </div>
        <div className="auth">
          <button className="btn2">
            <FaFacebook
              className="ic"
              appId="519366077228137"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
            />
            <div className="line"></div>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>

  );
}

export default Login;
