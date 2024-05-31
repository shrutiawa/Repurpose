import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError(""); // Clear any existing error message
    }

    try {
      const response = await axios.post(
        "https://localhost:3000/customers",
        formData
      );
      const data = response;
      navigate("/login");
    } catch (error) {
      console.error("Registration process failed");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input
              required
              placeholder=" "
              type="text"
              className="input"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            <span>Firstname</span>
          </label>
          <label>
            <input
              required
              placeholder=" "
              type="text"
              className="input"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input
            required
            placeholder=" "
            type="email"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            required
            placeholder=" "
            type="password"
            className="input"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required
            placeholder=" "
            type="password"
            className="input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit" className="submit">
          Submit
        </button>
        <p className="signin">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
