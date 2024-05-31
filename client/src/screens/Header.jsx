import "../styles/header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("customer")
  );
  const [isActive, setIsActive] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    setIsLoggedIn(false);
  };
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="homepage-header">
      <div className="header-logo" onClick={() => (window.location.href = "/")}>
        <img src="../../images.png" alt="" />
        <a href="/">
          RePurpose <br />
        </a>
      </div>
      <div className={`header-icons ${isActive ? "active" : ""}`}>
        {/* Buy link */}
        <div>
          <Link to="/product-list">Buy</Link>
        </div>
        <div>
          <a href="/repurpose/aboutus">About</a>
        </div>

        {/* Donate link */}
        <div>
          <a href="/repurpose/community">Community</a>
        </div>
        <div>
          {isLoggedIn ? (
            <div>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login">Login/SignUp</Link>
            </div>
          )}
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="hamburger"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
