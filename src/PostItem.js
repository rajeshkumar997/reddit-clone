import React, { useState } from "react";
import "./PostItem.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function PostItem(props) {
  const { isAuthenticated } = useAuth0();
  const [count, setCount] = useState(Math.floor(Math.random() * 400));

  const increment = () => {
    if (isAuthenticated) {
      setCount(count + 1)
    } else {
      alert("Please login first. .");
    }
  }
  const decrement = () => {
    if (isAuthenticated) {
      setCount(count - 1)
    } else {
      alert("Please login first. .");
    }
  }

  const { post } = props;

  return (
    <div className="post">
      <div className="post__left">
        <i className="fas fa-caret-up" onClick={increment}></i>
        <span>{count}</span>
        <i className="fas fa-caret-down" onClick={decrement}></i>
      </div>

      <div className="post__center">
        <img src={post.image} alt="" />
      </div>

      <div className="post__right">
        <h3>{post.title}</h3>
        <span className="post__info">
          submitted an hour ago by
          <Link >{post.user}</Link>
          <Link >{post.subreddit}</Link>
        </span>
        <p className="post__info">
          <Link>{post.comments_count} comments <i className="fas fa-comment"></i></Link>
          | share <i className="fas fa-share"></i> | save <i className="fas fa-save"></i> | hide | report
        </p>
      </div>

    </div>
  );
}

export default PostItem;
