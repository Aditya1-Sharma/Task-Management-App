import React, { useState } from "react";
import "../style.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const form = new FormData();
    // console.log(formData);

    form.append("userName", formData.userName);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("avatar", formData.avatar[0]);
    form.append("coverImage", formData.coverImage[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        console.log("User registered successfully:", response.data.user);
        reset();
        navigate("/login"); // Redirect to login page on success
      } else {
        console.log(response);
        setErrors(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.error("Error registering user:", error);
        setErrors(error.response.data.message);
      }
    }
  };

  return (
    <div className="register-container mt-20 max-w-96">
      <h2>Register</h2>
      {errors && <p className="error-message">{errors}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            {...register("userName", { required: "This is required" })}
            type="text"
            id="userName"
            name="userName"
          />
        </div>
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
        <div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            {...register("avatar", { required: "This is required" })}
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            {...register("coverImage")}
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            defaultValue={""}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <h5>
        Already Registered? <Link to="/login">Login</Link>
      </h5>
    </div>
  );
};

export default Register;
