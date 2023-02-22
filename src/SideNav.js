import React from "react";
import "./SideNav.css";
import { Link } from "react-router-dom";

function SideNav() {
  const menus = [
    { to: "/popular", text: "Popular" },
    { to: "/all", text: "All" },
    { to: "/random", text: "Random" },
  ];

  const subreddits = [
    "Askreddit",
    "Worldnews",
    "Videos",
    "Funny",
    "Todayileaned",
    "Pics",
    "Gaming",
    'Movies',
    'News',
    'Televison',
    'Jokes',
    'Science',
    'Soccer',
  ];
  return (
    <div className="sidenav">
      <div className="sidenav__logo">
        <img src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo.png" alt="reddit-logo" />
      </div>

      <div className="sidenav__search">
        <input type="text" name="search" placeholder="search" />
        <i className="fas fa-search"></i>
      </div>

      <div className="sidenav__link">
        <ul className="sidenav__menu">
          {menus.map((menu) => (
            <li>
              <Link to={menu.to}>{menu.text}</Link>
            </li>
          ))}
        </ul>
        <hr />
        <ul className="sidenav__subreddit">
          {subreddits.map(subreddit => (
            <li><Link to={`/r/${subreddit}`}>{subreddit}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
