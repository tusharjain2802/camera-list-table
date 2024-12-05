import React from "react";
import logo from "../assets/images/wobot_logo.svg";
const Header = () => (
  <header className="bg-gray-100 pt-4 text-center">
    <img className="w-36 mx-auto md:w-52" draggable="false" src={logo} />
  </header>
);

export default Header;
