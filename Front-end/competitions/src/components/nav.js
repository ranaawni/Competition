import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
// import AuthContext from "../context/auth-context";

const Navbar = (props) => {
  //   <AuthContext.Consumer>
  //     {(context) => {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>Competitions</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/participants">Participants</NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={logout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    //   );
    //     }}
    //   </AuthContext.Consumer>
  );
  function logout() {
    window.localStorage.clear();
    window.location = "/";
  }
};

export default Navbar;
