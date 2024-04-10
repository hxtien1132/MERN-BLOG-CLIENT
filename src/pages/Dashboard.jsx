import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = currentUser?.token;
  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (!token) navigate("/login");
    else fetchAuthors();
  }, []);
  if (loading) return <Loader />;
  return (
    <div>
      <section className="dashboard">
        {posts?.length > 0 ? (
          <div className="container dashboard__container">
            {posts.map((post) => {
              return (
                <article key={post._id} className="dashboard__post">
                  <div className="dashboard__post-info">
                    <div className="dashboard__post-thumbnail">
                      <img
                        src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`}
                        alt=""
                      />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className="dashboard__post-actions">
                    <Link to={`/posts/${post._id}`} className="btn sm">
                      View
                    </Link>
                    <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                      Edit
                    </Link>
                    <DeletePost postId={post._id} />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <h2 className="center">You have no posts yet</h2>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
