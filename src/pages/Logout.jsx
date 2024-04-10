import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  setCurrentUser(null);
  const navigate = useNavigate();
  navigate("/login");
  return <div>Logout</div>;
}

export default Logout;
