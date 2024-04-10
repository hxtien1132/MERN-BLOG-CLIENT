import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changInputHandler = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        userData
      );
      // console.log(response);
      const user = response.data;
      if (user) {
        setCurrentUser(user);
        toast.success("login successful", { autoClose: 2000 });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form action="" className="form login__form" onSubmit={handleSubmit}>
          {error && <p className="form__error-message">{error}</p>}
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
          <button type="submit" className="btn primary">
            login
          </button>
        </form>
        <small>
          Don't have an account ? <Link to={"/register"}>Sign Up</Link>{" "}
        </small>
      </div>
    </section>
  );
}
