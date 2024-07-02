import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center mx-4 md:mx-4 py-2">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-auto md:h-20" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/signin">
            <button className="h-10 w-20 text-lg md:h-20 md:w-20 md:text-2xl text-yellow-800 hover:text-black">
              SignIn
            </button>
          </Link>
          <Link to="/signup">
            <button className="h-10 w-20 text-lg md:h-20 md:w-20 md:text-2xl text-yellow-800 hover:text-black">
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
