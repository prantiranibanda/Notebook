import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex space-x-7 bg-blue-950 text-white py-4 px-8 items-center">
      <div className="text-2xl font-bold">iNotebook</div>
      <Link to="/" className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Home</Link>
      <div className="flex space-x-7 justify-end w-full">
        <Link to="/login" className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Login</Link>
        <Link to="/signup" className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Sign Up</Link>
      </div>
    </div>
  )
}

export default Navbar
