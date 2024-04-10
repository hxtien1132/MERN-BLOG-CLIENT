import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
  const createPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  // const handleImg = (e) => {
  //   console.log(e.target.files[0]);
  // };
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form action="" className="form create-post__form" onSubmit={createPost}>
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
            accept="png, jpg, jpeg"
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
