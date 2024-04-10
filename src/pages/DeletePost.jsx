import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  });
  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link className="btn sm danger" onClick={handleDelete}>
      Delete
    </Link>
  );
};

export default DeletePost;
