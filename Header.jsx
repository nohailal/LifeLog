import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../images/logo.png";

function Header() {
  const navigate = useNavigate();

  const services = [
    { name: "Blog", path: "/blog" },
    { name: "To-Do List", path: "/todo-list" },
    { name: "Health Journal", path: "/health-journal" },
    { name: "Secret Diary", path: "/secret-diary" },
    { name: "Steps Tracker", path: "/steps-tracker" },
  ];

  return (
    <header className="header">
      <nav className="navbar">
      
          <Link to="/">
            <img src={logo} alt="LifeLog Logo" className="logo" />
          </Link>
        
        <div className="menu">
          <div className="menu-links">
            <Link to="/">Home</Link>
            <div className="dropdown">
              <button className="dropbtn" aria-label="Services Menu">
                Services
              </button>
              <ul className="dropdown-content">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link to={service.path}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <button className="buttonLog" onClick={() => navigate("/login")}>
            Login
          </button>
          </div>
          
        </div>
      </nav>
    </header>
  );
}

export default Header;
