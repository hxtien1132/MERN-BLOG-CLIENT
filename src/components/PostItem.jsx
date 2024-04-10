import React from "react";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";

function PostItem({ item }) {
  const shortDescription =
    item.description?.length > 140
      ? item.description.substr(0, 140) + "..."
      : item.description;
  const postTitle =
    item.title?.length > 30 ? item.title.substr(0, 30) + "..." : item.title;
  return (
    <article className="post">
      <Link className="post__thumbnail" to={`/posts/${item._id}`}>
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${item?.thumbnail}`}
          alt=""
        />
      </Link>
      <div className="post__content">
        <Link to={`/posts/${item._id}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
      </div>
      <div className="post__footer">
        <PostAuthor authorId={item.creator} createdAt={item.createdAt} />
        <Link to={`/posts/categories/${item.category}`} className="btn category">
          {item.category}
        </Link>
      </div>
    </article>
  );
}

export default PostItem;
