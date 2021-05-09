import "./Nav.css";
import React, { useState, useEffect } from "react";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt="Getflix logo"
        className="nav-logo"
      />
      <img
        src="http://assets.stickpng.com/images/5a24123c6003f508dd5d5b39.png"
        alt="Glix logo"
        className="nav-avatar"
      />
    </div>
  );
}

export default Nav;
