import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ auth, setAuth }) => {
	return (
		<div className="flex items-center space-x-7 bg-blue-950 px-8 py-4 text-white">
			<div className="text-2xl font-bold">iNotebook</div>
			<Link
				to="/"
				className="text-lg font-semibold text-gray-400 hover:cursor-pointer hover:text-white"
			>
				Home
			</Link>
			<div className="flex w-full justify-end space-x-7">
				{auth === "null" ? (
					<div className="flex space-x-7">
						<Link
							to="/login"
							className="text-lg font-semibold text-gray-400 hover:cursor-pointer hover:text-white"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="text-lg font-semibold text-gray-400 hover:cursor-pointer hover:text-white"
						>
							Sign Up
						</Link>
					</div>
				) : (
					<button
						onClick={() => setAuth("null")}
						className="text-lg font-semibold text-gray-400 hover:cursor-pointer hover:text-white"
					>
						Logout
					</button>
				)}
				<a
					href="https://github.com/prantiranibanda/Notebook"
					target="_blank"
					rel="noreferrer"
				>
					<i className="fi fi-brands-github cursor-pointer text-2xl text-gray-400 hover:text-white"></i>
				</a>
			</div>
		</div>
	);
};

export default Navbar;
