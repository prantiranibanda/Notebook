import React, { useEffect, useState } from 'react'
let nt;
const Home = () => {
    const [title, setTitle] = useState("")
    const [desp, setDesp] = useState("")
    const [tag, setTag] = useState("")
    const [notes, setNotes] = useState([])
    const [hid, setHid] = useState(true)

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleDesp = (event) => {
        setDesp(event.target.value);
    };
    const handleTag = (event) => {
        setTag(event.target.value);
    };
    //Creating notes...............................................................................................
    async function createNote(data){
        const response = await fetch("http://localhost:5000/api/nts/addnotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZjg5ZmY2ZDZhNzc3NDQ2YTMxODEzIn0sImlhdCI6MTcwNjAwOTI2Mn0.UFfBlbnlW4zuTi6q-kD-23lvCagDiD-nT7AQJKRX8aA"
            },
            body: JSON.stringify(data),
        })
        let resp = await response.json();
        setTitle("");
        setDesp("");
        setTag("")
        fetchNote();
    }

    function storeData(){
        let data = {}
        data.title = title;
        data.description = desp;
        data.tag = tag;

        createNote(data);
    }
    //Fetching Notes..........................................................................
    async function fetchNote(data){
        const response = await fetch("http://localhost:5000/api/nts/fetchnotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZjg5ZmY2ZDZhNzc3NDQ2YTMxODEzIn0sImlhdCI6MTcwNjAwOTI2Mn0.UFfBlbnlW4zuTi6q-kD-23lvCagDiD-nT7AQJKRX8aA"
            },
        })
        response.json().then(data=>{setNotes(data);})
        // let resp = await response.json();
        // setNotes(resp);
        // console.log(resp);
    }
    useEffect(()=>{
        fetchNote();
    },[])
    //Delete Notes..............................................................................
    async function handleDelete(id){
        const response = await fetch(`http://localhost:5000/api/nts/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZjg5ZmY2ZDZhNzc3NDQ2YTMxODEzIn0sImlhdCI6MTcwNjAwOTI2Mn0.UFfBlbnlW4zuTi6q-kD-23lvCagDiD-nT7AQJKRX8aA"
            },
        })
        let resp = await response.json();
        console.log(resp);
        fetchNote();
    }
    //Updating Notes............................................................................
    async function handleUpdate(data, id){
        const response = await fetch(`http://localhost:5000/api/nts/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZjg5ZmY2ZDZhNzc3NDQ2YTMxODEzIn0sImlhdCI6MTcwNjAwOTI2Mn0.UFfBlbnlW4zuTi6q-kD-23lvCagDiD-nT7AQJKRX8aA"
            },
            body: JSON.stringify(data),
        })
        let resp = await response.json();
        //console.log(resp);
        fetchNote();
    }
    function saveChanges(){
        let data = {}
        data.title = title;
        data.description = desp;
        data.tag = tag;
        //console.log(data)
        handleUpdate(data, nt[0]._id);
        setHid(true);
        setTitle("");
        setDesp("");
        setTag("");
        //console.log(nt[0]._id)
    }

    function editNote(id){
        setHid(false);
        nt = notes.filter((note) => note._id === id);
        console.log(nt[0]);
        setTitle(nt[0].title);
        setDesp(nt[0].description);
        setTag(nt[0].tag);
    }

    return (
        <>
            <div className={`flex justify-center ${hid?"":"hidden"}`}>
            <div className="w-2/3"> 
                <div className="text-4xl font-bold mt-6 mb-4">Add Notes:</div>  
                <div className="p-3 px-10 bg-purple-200 my-1">
                    <div className="text-xl font-bold pb-2 text-purple-600">Title:</div>
                    <input type="text" name="title" placeholder="Give a title" className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2" value={title} onChange={handleTitle}/>
                </div> 
                <div className="p-3 px-10 bg-purple-200 my-1">
                    <div className="text-xl font-bold pb-2 text-purple-600">Description:</div>
                    <textarea type="text" name="description" placeholder="Write your note here..." className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2 h-64" value={desp} onChange={handleDesp}/>
                </div>
                <div className="p-3 px-10 bg-purple-200 my-1">
                    <div className="text-xl font-bold pb-2 text-purple-600">Tag:</div>
                    <input type="text" name="tag" placeholder="Give a Tag" className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2" value={tag} onChange={handleTag}/>
                </div>
                <button className="px-3 py-2 bg-sky-400 rounded-md mt-4 text-white border-4 border-sky-300 font-medium" onClick={storeData}>ADD NOTE</button>
                <div className="bg-blue-600 h-[2px] my-5"></div>
                <div className="text-4xl font-bold">Your Notes:</div>
                {notes.map((note, index)=>{
                    return (
                    <div 
                    className="bg-gray-100 my-4 py-5 px-5 shadow-md border-[2px] border-gray-300 rounded-sm"
                    key={note._id}>
                        <div className="text-2xl font-bold text-emerald-500 pb-2 border-b-2 border-emerald-500 w-fit">{index+1}. {note.title}</div>
                        <div className="px-1 border-l-2 border-orange-400 m-3 text-lg font-serif">{note.description}</div>
                        <div className="flex space-x-4">
                            <div className="bg-purple-300 text-purple-500 w-fit text-sm font-medium py-1 px-2 rounded-2xl">{note.tag}</div>
                            <div className="bg-purple-300 text-purple-500 w-fit text-sm font-medium py-1 px-2 rounded-2xl">{note.date}</div>
                        </div>
                        <div className="flex space-x-3 text-purple-900 justify-end">
                            <button onClick = {()=>{handleDelete(note._id)}} className="material-symbols-outlined">delete</button>
                            <button onClick = {()=>{editNote(note._id)}} className="material-symbols-outlined">edit_square</button>
                        </div>
                    </div>
                    )
                })}
            </div>
            </div>
            <div className={`flex justify-center ${hid?"hidden":""}`}>
                <div className="w-2/3">
                    <div className="text-4xl font-bold mt-6 mb-4">Edit Notes:</div>  
                    <div className="p-3 px-10 bg-purple-200 my-1">
                        <div className="text-xl font-bold pb-2 text-purple-600">Title:</div>
                        <input type="text" name="title" placeholder="Give a title" className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2" value={title} onChange={handleTitle}/>
                    </div> 
                    <div className="p-3 px-10 bg-purple-200 my-1">
                        <div className="text-xl font-bold pb-2 text-purple-600">Description:</div>
                        <textarea type="text" name="description" placeholder="Write your note here..." className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2 h-64" value={desp} onChange={handleDesp}/>
                    </div>
                    <div className="p-3 px-10 bg-purple-200 my-1">
                        <div className="text-xl font-bold pb-2 text-purple-600">Tag:</div>
                        <input type="text" name="tag" placeholder="Give a Tag" className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2" value={tag} onChange={handleTag}/>
                    </div>
                    <button className="px-3 py-2 bg-sky-400 rounded-md mt-4 text-white border-4 border-sky-300 font-medium" onClick={saveChanges}>SAVE CHANGES</button>
                </div>
            </div>
        </>
    )
}

export default Home
