import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'
import Header from './Header';
import {useNavigate} from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To display server response

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }); // Adjust the URL if needed
      const data = response.data;
      console.log(data)
      setMessage(data.message);
      navigate("/")
      localStorage.setItem("customer",data.customerId)
      if (data.token) {
        // Redirect user to another page upon successful login
        window.location.href = '/home'; // Adjust the URL as needed
      }
    } catch (error) {
      console.log("Login process failed")
      setMessage('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (<>
      <Header/>
    <div className="form-container">
      <p className="title1">Welcome back</p>
      <form className="loginform" onSubmit={handleSubmit}>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="page-link">
          <span className="page-link-label">Forgot Password?</span>
        </p>
        <button type="submit" className="form-btn">Log in</button>
      </form>
      <p className="message">{message}</p>
      <p className="sign-up-label">
        Don't have an account? <span className="sign-up-link"><a href="/register">Sign Up</a></span>
      </p>
      <div className="buttons-container">
        {/* Social login buttons */}
      </div>
    </div>
    </>
  );
};

export default LoginForm;
