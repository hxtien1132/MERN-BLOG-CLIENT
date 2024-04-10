import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import avatar from "../assets/images/avatar1.jpg";
import axios from "axios";
// import ReactTimeAgo from "react-time-ago";
// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locate/en";
// import ru from "javascript-time-ago/locate/ru";

// TimeAgo.addDefaultLocale(en);
// TimeAgo.addDefaultLocale(ru);
export const PostAuthor = ({ authorId, createdAt }) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [author, setAuthor] = useState({});
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorId}`
        );
        setAuthor(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);
  return (
    <>
      {author && (
        <Link to={`/posts/users/${authorId}`} className="post__author">
          <div className="post__author-avatar">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`}
              alt=""
            />
          </div>
          <div className="post__author-details">
            <h5>By: {author?.name}</h5>
            <small>{formattedDate}</small>
          </div>
        </Link>
      )}
    </>
  );
};
