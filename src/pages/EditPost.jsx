import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Axios from "axios";
const EditPost = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Weather");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  });
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "1" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const POST_CATEGORITES = [
    "Technology",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Politics",
    "Weather",
  ];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await Axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategory(res.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  const editPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <section className="edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form action="" className="form edit-post__form" onSubmit={editPost}>
          <input
            type="text"
            name="title"
            id=""
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id=""
          >
            {POST_CATEGORITES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            placeholder="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png , jpg ,jpeg"
          />
          <button type="submit" className="btn primary">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
