import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
        setAuthors(res?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchAuthors();
  }, []);
  if (loading) return <Loader />;
  return (
    <section className="authors">
      {authors?.length > 0 ? (
        <div className="container authors__container">
          {authors.map((author) => {
            return (
              <Link key={author._id} to={`/posts/users/${author._id}`} className="author">
                <div className="author__avatar">
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`}
                    alt=""
                  />
                </div>
                <div className="author__info">
                  <h4>{author.name}</h4>
                  <p>{author.posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No users/authors found</h2>
      )}
    </section>
  );
};

export default Authors;
