import React, { useContext, useEffect, useState } from "react";
import { PostAuthor } from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import thumbnail from "../assets/images/avatar1.jpg";
import { UserContext } from "../context/userContext";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";
import axios from "axios";
function PostDetails() {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      setIsloading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        console.log(res.data);
        setPost(res.data);
      } catch (error) {
        setError(error);
      }
      setIsloading(false);
    };
    getPost();
  }, []);
  if (isLoading) return <Loader />;
  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorId={post.creator} createdAt={post.createdAt} />
            {currentUser?.id && post.creator && currentUser.id === post.creator && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post?.title}</h1>
          <div className="post-detail__thumbnail">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`}
              alt=""
            />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
}

export default PostDetails;
