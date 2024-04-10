import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
const schema = yup.object({
  name: yup
    .string()
    .min(6, "Your name must be at least 8 characters or greater")
    .required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(6, "Your password must be at least 6 characters or greater")
    .required("Please enter your password"),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changInputHandler = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );
      console.log(response);
      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't register user");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form action="" className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={userData.name}
            onChange={changInputHandler}
            autoFocus
          />
          <input
            type="text"
            placeholder="email address"
            name="email"
            value={userData.email}
            onChange={changInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changInputHandler}
          />
          <button type="submit" className="btn primary">
            {" "}
            Register
          </button>
        </form>
        <small>
          Already have an account ? <Link to={"/login"}>Log In</Link>{" "}
        </small>
      </div>
    </section>
  );
}
