import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let nt;
const Home = ({ auth }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tag, setTag] = useState("");
	const [notes, setNotes] = useState([]);
	const [hid, setHid] = useState(true);
	const [displayNote, setDisplayNote] = useState(true);
	const [heading, setHeading] = useState();
	const [content, setContent] = useState();

	const handleTitle = event => {
		setTitle(event.target.value);
	};
	const handleDesp = event => {
		setDescription(event.target.value);
	};
	const handleTag = event => {
		setTag(event.target.value);
	};
	const navigate = useNavigate();
	//Creating notes..........................................................................
	async function createNote() {
		const response = await fetch(
			"http://35.154.110.148:5000/api/nts/addnotes",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"auth-token": `${auth}`,
				},
				body: JSON.stringify({ title, description, tag }),
			},
		);
		let resp = await response.json();
		setTitle("");
		setDescription("");
		setTag("");
		fetchNote();
	}
	//Fetching Notes..........................................................................
	async function fetchNote() {
		const response = await fetch(
			"http://35.154.110.148:5000/api/nts/fetchnotes",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"auth-token": `${auth}`,
				},
			},
		);
		response.json().then(data => {
			setNotes(data);
		});
		// let resp = await response.json();
		// setNotes(resp);
	}
	useEffect(() => {
		if (auth === "null") navigate("/login");
		else {
			console.log(auth);
			fetchNote();
		}
	}, [auth]);

	//Delete Notes............................................................................
	async function handleDelete(id) {
		const response = await fetch(
			`http://35.154.110.148:5000/api/nts/deletenote/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"auth-token": `${auth}`,
				},
			},
		);
		let resp = await response.json();
		console.log(resp);
		fetchNote();
	}
	//Updating Notes..........................................................................
	async function handleUpdate(id) {
		const response = await fetch(
			`http://35.154.110.148:5000/api/nts/updatenote/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"auth-token": `${auth}`,
				},
				body: JSON.stringify({ title, description, tag }),
			},
		);
		let resp = await response.json();
		fetchNote();
	}
	//show a single note in one page
	async function showOneNote(id) {
		const response = await fetch(
			`http://35.154.110.148:5000/api/nts/showonenote/${id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"auth-token": `${auth}`,
				},
			},
		);
		let resp = await response.json();
		setHeading(resp.note.title);
		setContent(resp.note.description);
		setDisplayNote(false);
	}

	function saveChanges() {
		handleUpdate(nt[0]._id);
		setHid(true);
		setTitle("");
		setDescription("");
		setTag("");
	}

	function editNote(id) {
		setHid(false);
		nt = notes.filter(note => note._id === id);
		console.log(nt[0]);
		setTitle(nt[0].title);
		setDescription(nt[0].description);
		setTag(nt[0].tag);
	}

	return (
		<div className="relative">
			<div
				className={`flex justify-center ${hid ? "" : "blur-lg"} ${displayNote ? "" : "blur-lg"}`}
			>
				<div className="w-2/3">
					<div className="my-6 border-b-2 border-orange-400 py-3 text-4xl font-bold text-blue-900">
						Add Note
					</div>

					<div className="rounded-md bg-purple-50 p-3 shadow-lg shadow-purple-300/50">
						<div className="flex space-x-4 p-3">
							<div className="pb-2 text-xl font-bold text-purple-600">
								Title:
							</div>
							<input
								type="text"
								name="title"
								placeholder="Give a title"
								className="w-full rounded-md border-b-2 border-gray-400 px-2 py-1 italic"
								value={title}
								onChange={handleTitle}
							/>

							<div className="pb-2 text-xl font-bold text-purple-600">Tag:</div>
							<input
								type="text"
								name="tag"
								placeholder="Give a Tag"
								className="w-full rounded-md border-b-2 border-gray-400 px-2 py-1 italic"
								value={tag}
								onChange={handleTag}
							/>
						</div>
						<div className="p-3">
							<div className="pb-2 text-xl font-bold text-purple-600">
								Description:
							</div>
							<textarea
								type="text"
								name="description"
								placeholder="Write your note here..."
								className="h-40 w-full rounded-md border-b-2 border-gray-400 px-2 py-1 italic"
								value={description}
								onChange={handleDesp}
							/>
						</div>
						<div className="flex justify-end p-3">
							<div
								className="w-1/6 rounded-md bg-purple-500 py-3 text-center font-medium text-white hover:cursor-pointer"
								onClick={createNote}
							>
								ADD NOTE
							</div>
						</div>
					</div>

					{notes.length !== 0 && (
						<div>
							<div className="mb-5 mt-10 border-b-2 border-orange-500 py-3 text-4xl font-bold text-blue-900">
								Your Notes
							</div>
							<div className="mb-10 grid grid-cols-3 gap-5">
								{notes.map((note, index) => {
									return (
										<div
											className="flex flex-col justify-between rounded-lg border border-purple-500 bg-purple-50 px-5 py-5 hover:cursor-pointer hover:bg-purple-100 hover:shadow-md hover:shadow-purple-900/50"
											key={note._id}
										>
											<div className="flex justify-end space-x-3 text-purple-900">
												<button
													onClick={() => {
														handleDelete(note._id);
													}}
													className="material-symbols-outlined"
												>
													delete
												</button>
												<button
													onClick={() => {
														editNote(note._id);
													}}
													className="material-symbols-outlined"
												>
													edit_square
												</button>
											</div>
											<div
												onClick={() => {
													showOneNote(note._id);
												}}
												className="line-clamp-1 text-xl font-bold text-blue-900"
											>
												{index + 1}. {note.title}
											</div>
											<div
												onClick={() => {
													showOneNote(note._id);
												}}
												className="line-clamp-2 h-14 font-serif text-lg"
											>
												{note.description}
											</div>
											<div
												onClick={() => {
													showOneNote(note._id);
												}}
												className="flex items-end justify-between"
											>
												<div className="rounded-full bg-purple-300 px-2 py-1 text-sm font-medium text-purple-600">
													#{note.tag}
												</div>
												<div className="text-xs text-purple-600">
													{note.date.substring(0, 10)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
			<div
				className={`fixed top-0 flex h-full w-full justify-center ${hid ? "hidden" : ""}`}
			>
				<div className="absolute -z-10 h-full w-full bg-[#87668d8b]"></div>
				<div className="z-5 mt-10 h-fit w-1/2 px-4 py-10 opacity-100">
					<div className="text-center text-3xl font-bold">Edit Notes</div>
					<div className="my-1 rounded-t-lg bg-purple-100 px-10 py-3">
						<div className="pb-2 text-xl font-bold text-purple-600">Title:</div>
						<input
							type="text"
							name="title"
							placeholder="Give a title"
							className="w-full rounded-md border border-blue-500 px-2 py-1 italic"
							value={title}
							onChange={handleTitle}
						/>
					</div>
					<div className="my-1 bg-purple-100 px-10 py-3">
						<div className="pb-2 text-xl font-bold text-purple-600">
							Description:
						</div>
						<textarea
							type="text"
							name="description"
							placeholder="Write your note here..."
							className="h-52 w-full rounded-md border border-blue-500 px-2 py-1 italic"
							value={description}
							onChange={handleDesp}
						/>
					</div>
					<div className="my-1 rounded-b-lg bg-purple-100 px-10 pb-6 pt-3">
						<div className="pb-2 text-xl font-bold text-purple-600">Tag:</div>
						<input
							type="text"
							name="tag"
							placeholder="Give a Tag"
							className="w-full rounded-md border border-blue-500 px-2 py-1 italic"
							value={tag}
							onChange={handleTag}
						/>
					</div>
					<div className="flex justify-center p-3">
						<div
							className="rounded-md bg-purple-500 px-3 py-3 text-center font-medium text-white hover:cursor-pointer"
							onClick={saveChanges}
						>
							SAVE CHANGES
						</div>
					</div>
				</div>
			</div>
			<div
				className={`fixed top-0 flex h-full w-full justify-center ${displayNote ? "hidden" : ""}`}
			>
				<div
					className="absolute -z-10 h-full w-full bg-[#87668d8b]"
					onClick={() => {
						setDisplayNote(true);
					}}
				></div>
				<div className="z-5 mt-14 h-fit min-h-96 w-2/5 rounded-lg bg-purple-100 p-6 opacity-100">
					<div className="border-b-2 border-white pb-3 text-center text-3xl font-bold text-blue-900">
						{heading}
					</div>
					<div className="pt-3">{content}</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
