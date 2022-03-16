import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="container">
      <header className="header">
        <div className="brand-container">
          <Link className="link" to="/">
            <p className="brand-title">
              eXpense&nbsp;<span className="brand-title-span">tracker</span>
            </p>
          </Link>
        </div>
        <nav className="nav-container">
          <ul className="nav-list">
            <Link className="link" to="/">
              <li className="nav-item">Home</li>
            </Link>

            {isAuthenticated && (
              <>
                <Link className="link" to="/dashboard">
                  <li className="nav-item">Dashboard</li>
                </Link>

                <Link className="link" to="/profile">
                  <li className="nav-item">Profile</li>
                </Link>
                <li className="n">
                  <LogoutButton />
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
