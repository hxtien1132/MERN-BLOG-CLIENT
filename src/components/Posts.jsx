import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { list } from "../data";
import axios from "axios";
import Loader from "./Loader";
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(res?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);
  if (loading) return <Loader />;
  return (
    <>
      <section className="posts">
        {posts && posts.length > 0 ? (
          <div className="container posts__container">
            {posts.map((item) => (
              <PostItem key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <h2 className="center">No posts yet</h2>
        )}
      </section>
    </>
  );
}
