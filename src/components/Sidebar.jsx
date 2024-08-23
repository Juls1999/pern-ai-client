import React from "react";
import sidebar from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="shadow" style={{ height: "100svh" }}>
      <div>
        <p className="h2 text-center">AI - KB</p>
      </div>
      <hr className="hr" />
      <div>
        <ul className={`${sidebar.navList}`}>
          <li className="mb-2">
            <Link
              to="/"
              className={currentPath === "/" ? sidebar.active : ""}
            >
              <i className="bi bi-house-fill"></i> Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/chat"
              className={currentPath === "/chat" ? sidebar.active : ""}
            >
              <i className="bi bi-chat-fill"></i> Chat
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/feedback"
              className={currentPath === "/feedback" ? sidebar.active : ""}
            >
              <i className="bi bi-text-center"></i> Feedback
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
