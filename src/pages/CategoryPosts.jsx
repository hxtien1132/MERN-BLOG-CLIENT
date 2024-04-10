import React, { useEffect, useState } from "react";
import Authors from "./Authors";
import { list } from "../data";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`
        );
        setPosts(res?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [category]);
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
          <h2 className="center">No category posts yet</h2>
        )}
      </section>
    </>
  );
};

export default CategoryPosts;
