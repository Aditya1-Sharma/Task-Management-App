import React, { useState } from "react";
import "../style.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        console.log("User logged in successfully:", response.data.user);
        reset();
        navigate("/dashboard"); // Redirect to the dashboard or home page on success
      } else {
        setErrors(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      setErrors("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      {errors && <p className="error-message">{errors}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email", { required: "This is required" })}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password", { required: "This is required" })}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <h5>
        Don't have an account? <Link to="/register">Register</Link>
      </h5>
    </div>
  );
};

export default Login;
