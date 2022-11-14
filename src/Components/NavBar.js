import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function NavBar(props) {
  const { user, setUser, logOut } = useContext(AuthContext);

  return (
    <nav className="NavBar">
      <ul>
        {props.children}
      </ul>
    </nav>
  );
}

export default NavBar;
