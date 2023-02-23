import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";


function Header() {

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className="header">
      <div className="header__left">
        <ul>
          <Link to="/popular" className="active">Popular</Link>
          <Link to="/hot">Hot</Link>
          <Link to="/rising">Rising</Link>
          <Link to="/controversial">Controversial</Link>
          <Link to="/top">Top</Link>
          <Link to="/gilded">Gilded</Link>
        </ul>
      </div>

      <div className="header__right">
        <i className="fas fa-bell"></i>
        <div className="header__user">

          {
            isAuthenticated ? (<>
              <img className="img1" src={user.picture} alt="user" />
              <span>{user.name}</span>
              <Button variant="contained" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</Button >
            </>
            ) : (
              <Button variant="contained" onClick={() => loginWithRedirect()}>Log In</Button >
            )
          }
        </div>

      </div>
    </div>
  );
}

export default Header;
