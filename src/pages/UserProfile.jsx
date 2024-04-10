import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/images/img-upload.png";
// import { FaCheck } from "react-icons/fa";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
function UserProfile() {
  const [avatar, setAvatar] = useState();
  const [author, setAuthor] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isAvatarCheck, setIsAvatarCheck] = useState(false);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const { id, token } = currentUser;
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`);
        setAvatar(res?.data.avatar);
        setAuthor((prev) => ({ ...prev, name: res.data.name, email: res.data.email }));
      } catch (error) {
        console.log(error);
      }
    };
    if (!token) navigate("/login");
    else fetchAuthors();
  }, []);

  // console.log(author);
  const changInputHandler = (e) => {
    setAuthor((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const AuthorUpdateHandle = async (e) => {
    console.log(author);
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        author,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        toast.success("Profile updated", { autoClose: 2000 });
        navigate(0);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const changeAvatarHandle = async (e) => {
    console.log("alalal");
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAvatar(res?.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My posts
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              {avatar ? (
                <img
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                  alt=""
                />
              ) : (
                <img src={Avatar} alt="" />
              )}
            </div>
            <form action="" className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarCheck(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarCheck && (
              <button className="profile__avatar-btn" onClick={changeAvatarHandle}>
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{author?.name}</h1>
          <form
            action=""
            className="form profile__form"
            autoComplete="off"
            onSubmit={AuthorUpdateHandle}
          >
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full name"
              name="name"
              value={author.name}
              onChange={changInputHandler}
              autoFocus
            />
            <input
              type="text"
              placeholder="Email address"
              name="email"
              value={author.email}
              onChange={changInputHandler}
            />
            <input
              type="password"
              placeholder="Old Password"
              name="currentPassword"
              value={author.currentPassword}
              onChange={changInputHandler}
            />
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={author.newPassword}
              onChange={changInputHandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmNewPassword"
              value={author.confirmNewPassword}
              onChange={changInputHandler}
            />
            <button type="submit" className="btn primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
