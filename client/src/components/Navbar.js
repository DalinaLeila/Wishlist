import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "./Auth/Auth";
import "./Auth/auth.css";

const Navbar = props => {
  const handleLogout = () => {
    logout();
    props.clearUser(null);
  };

  console.log(props);
  return (
    <Nav className="nav navbar">
      <div>
        <Link to="/">LOGO</Link>
      </div>
      <div className="flex">
        {props.user ? (
          <>
            <Link to={`/profile/${props.user._id}`}>
              Hello {props.user.username}
            </Link>
            <Link to="/profile/wishlist/new">Create</Link>

            <Link to="/logout" onClick={() => handleLogout()}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
