import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../style.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../contexts/UserContexts";
import { signInSuccess } from "../redux/user/userSlice";
import { fetchUserData } from "../redux/user/userSlice.js";
const Login = () => {
  // useEffect(()=>{
  //   const response =
  // },[])
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const { loggedUser, setloggedUser } = useContext(userContext);
  const [errors, setErrors] = useState("");

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("User logged in successfully:", response.data.user);
        console.log(response);

        if (response.data.data.accessToken) {
          const accessToken = JSON.stringify(response.data.data.accessToken);
          localStorage.setItem("Task", accessToken);
          setloggedUser(accessToken);
          dispatch(signInSuccess(response.data));
          dispatch(fetchUserData());
          console.log("data fetched");
        }

        reset();

        navigate("/dashboard"); // Redirect to the dashboard or home page on success
      } else {
        setErrors(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      setErrors(error.response.data.message);
    }
  };

  return (
    <div className="register-container max-w-96 mt-20">
      <h2>Login</h2>
      {errors && <p className="error-message">{errors}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className=" border-2"
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

// adi@adi1.com
