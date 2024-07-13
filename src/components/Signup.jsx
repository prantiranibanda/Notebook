import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = ({ auth, setAuth }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [openeye, setOpeneye] = useState(false);

	const navigate = useNavigate();

	function handleName(event) {
		setName(event.target.value);
	}
	function handleEmail(event) {
		setEmail(event.target.value);
	}
	function handlePassword(event) {
		setPassword(event.target.value);
	}

	async function createUser() {
		try {
			const response = await fetch("http://localhost:5000/api/auth/createuser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});
			let resp = await response.json();
			if (resp.success) {
				setAuth(resp.authToken);
				navigate("/");
				setName("");
				setEmail("");
				setPassword("");
			} else {
				for (let i = 0; i < resp.errors.length; i++) {
					const err = resp.errors[i];
					toast.error(err.msg);
				}
			}
		} catch (error) {
			toast.error("Backend not running!");
		}
	}
	// function storeUserData(){
	//   let data = {}
	//   data.name = name;
	//   data.email = email;
	//   data.password = password;
	//   createUser(data);
	// }
	return (
		<>
			<Toaster />
			<div className="mt-24 flex justify-center">
				<div className="w-1/4 rounded-md border-2 border-gray-300 bg-purple-100 px-6 pb-10 pt-4">
					<div className="pb-7 text-center text-xl font-bold text-blue-900">
						Create New Account
					</div>
					<div className="mb-4">
						<div className="pb-2 font-bold text-purple-600">NAME:</div>
						<input
							type="text"
							name="title"
							placeholder="Enter your name"
							className="w-full border-b-2 border-blue-500 px-2 py-1 focus:outline-none"
							value={name}
							onChange={handleName}
						/>
					</div>
					<div className="mb-4">
						<div className="pb-2 font-bold text-purple-600">EMAIL:</div>
						<input
							type="text"
							name="description"
							placeholder="Enter your email"
							className="w-full border-b-2 border-blue-500 px-2 py-1 focus:outline-none"
							value={email}
							onChange={handleEmail}
						/>
					</div>
					<div className="mb-4">
						<div className="pb-2 font-bold text-purple-600">PASSWORD:</div>
						<div className="flex">
							<input
								type={openeye ? "text" : "password"}
								name="tag"
								placeholder="Enter password"
								className="w-full border-b-2 border-blue-500 px-2 py-1 focus:outline-none"
								value={password}
								onChange={handlePassword}
							/>
							<button
								className="material-symbols-outlined border-b-2 border-blue-500 bg-white pr-2 text-gray-600"
								onClick={() => {
									setOpeneye(!openeye);
								}}
							>
								{openeye ? "visibility" : "visibility_off"}
							</button>
						</div>
					</div>
					<div
						className="mt-14 rounded-md bg-purple-600 py-2 text-center font-semibold text-white hover:cursor-pointer"
						onClick={createUser}
					>
						Sign up
					</div>
				</div>
			</div>
			<div className="p-4 text-center text-sm">
				Already have an account?{" "}
				<span
					className="text-blue-600 underline hover:cursor-pointer"
					onClick={() => {
						navigate("/login");
					}}
				>
					Login
				</span>
			</div>
		</>
	);
};

export default Signup;
