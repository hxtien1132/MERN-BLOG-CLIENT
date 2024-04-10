import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import { capitalizeFirstLetters } from "../config/capitalize";

function Header() {
  const { currentUser } = useContext(UserContext);
  const [isNavshowing, setIsnavshowing] = useState(() =>
    window.innerWidth > 800 ? true : false
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   if (isNavshowing) {
  //     setTemp(true);
  //   } else {
  //     setTemp(false);
  //   }
  // }, [isNavshowing, temp]);
  useEffect(() => {
    const handleResize = () => {
      setIsnavshowing(window.innerWidth > 800 ? true : false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isNavshowing, currentUser]);
  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsnavshowing(false);
    } else {
      setIsnavshowing(true);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to={"/"} onClick={closeNavHandler}>
          <img src={logo} alt="navbar logo" className="nav__logo" />
        </Link>
        {currentUser && isNavshowing && (
          <ul className="nav__menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>
                {capitalizeFirstLetters(currentUser.name)}
              </Link>
            </li>
            <li>
              <Link to={"/create"} onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to={"/logout"} onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!currentUser && isNavshowing && (
          <ul className="nav__menu">
            <li>
              <Link to={"/authors"} onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to={"/login"} onClick={closeNavHandler}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => {
            setIsnavshowing(!isNavshowing);
          }}
        >
          {isNavshowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Header;
