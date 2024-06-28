import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

let nt;
const Home = ({auth, setAuth}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState("")
    const [notes, setNotes] = useState([])
    const [hid, setHid] = useState(true)

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleDesp = (event) => {
        setDescription(event.target.value);
    };
    const handleTag = (event) => {
        setTag(event.target.value);
    };
    const navigate = useNavigate();
    //Creating notes..........................................................................
    async function createNote(){
        const response = await fetch("http://localhost:5000/api/nts/addnotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${auth}`
            },
            body: JSON.stringify({title, description, tag}),
        })
        let resp = await response.json();
        setTitle("");
        setDescription("");
        setTag("")
        fetchNote();
    }
    //Fetching Notes..........................................................................
    async function fetchNote(){
        const response = await fetch("http://localhost:5000/api/nts/fetchnotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${auth}`
            },
        })
        response.json().then(data=>{setNotes(data);})
        // let resp = await response.json();
        // setNotes(resp);
        // console.log(resp);
    }
    useEffect(()=>{
        if (auth === "null") navigate("/login")
        else {
            console.log(auth);
            fetchNote(); 
        } 
    }, [auth])
    
    //Delete Notes............................................................................
    async function handleDelete(id){
        const response = await fetch(`http://localhost:5000/api/nts/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${auth}`
            },
        })
        let resp = await response.json();
        console.log(resp);
        fetchNote();
    }
    //Updating Notes..........................................................................
    async function handleUpdate(id){
        const response = await fetch(`http://localhost:5000/api/nts/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${auth}`
            },
            body: JSON.stringify({title, description, tag}),
        })
        let resp = await response.json();
        //console.log(resp);
        fetchNote();
    }
    //show a single note in one page
    async function showOneNote(id) {
        const response = await fetch(`http://localhost:5000/api/nts/showonenote/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${auth}`
            }
        })
        let resp = await response.json();
        navigate("/notes", {state: resp});
    }


    function saveChanges(){
        // let data = {}
        // data.title = title;
        // data.description = description;
        // data.tag = tag;
        //console.log(data)
        handleUpdate(nt[0]._id);
        setHid(true);
        setTitle("");
        setDescription("");
        setTag("");
        //console.log(nt[0]._id)
    }

    function editNote(id){
        setHid(false);
        nt = notes.filter((note) => note._id === id);
        console.log(nt[0]);
        setTitle(nt[0].title);
        setDescription(nt[0].description);
        setTag(nt[0].tag);
    }

    return (
        <>
            <div className={`flex justify-center ${hid?"":"hidden"}`}>
                <div className="w-2/3"> 
                    <div className="p-3 text-4xl text-blue-900 font-bold my-6 border-b-2 border-orange-400">Add Your Notes</div>     
                    <div className='p-3 rounded-md bg-purple-50 shadow-lg shadow-purple-300/50'>
                        <div className="p-3 flex space-x-4">
                            <div className="text-xl font-bold pb-2 text-purple-600">Title:</div>
                            <input type="text" name="title" placeholder="Give a title" className="italic rounded-md border-b-2 border-gray-400 w-full py-1 px-2" value={title} onChange={handleTitle}/>
                            
                            <div className="text-xl font-bold pb-2 text-purple-600">Tag:</div>
                            <input type="text" name="tag" placeholder="Give a Tag" className="italic rounded-md border-b-2 border-gray-400 w-full py-1 px-2" value={tag} onChange={handleTag}/>
                        </div>  
                        <div className="p-3">
                            <div className="text-xl font-bold pb-2 text-purple-600">Description:</div>
                            <textarea type="text" name="description" placeholder="Write your note here..." className="italic rounded-md border-b-2 border-gray-400 w-full py-1 px-2 h-40" value={description} onChange={handleDesp}/>
                        </div>
                    <div className='p-3 flex justify-end'><div className="w-1/5 py-3 bg-purple-500 rounded-md text-center text-white border-4 border-[#d095de] font-medium" onClick={createNote}>ADD NOTE</div></div>
                    </div>
                    
                    
                    <div className="p-3 text-4xl text-blue-900 font-bold mt-10 mb-5 border-b-2 border-orange-400">Your Notes List</div>

                    {(auth === "null")?<div>Login or sign up</div>:
                    ((notes == [])?<div>You have no notes. Create your notes</div>:
                    <div className='grid grid-cols-3 gap-5'>
                        {notes.map((note, index)=>{
                        return (
                        <div 
                        className="bg-purple-50 hover:bg-purple-100 py-5 px-5 hover:shadow-md hover:shadow-purple-900/50 border border-purple-500 rounded-lg"
                        key={note._id}>
                            <div className="flex space-x-3 text-purple-900 justify-end">  
                                <button onClick={()=>{showOneNote(note._id)}} className="material-symbols-outlined text-3xl">read_more</button>
                                <button onClick = {()=>{handleDelete(note._id)}} className="material-symbols-outlined">delete</button>
                                <button onClick = {()=>{editNote(note._id)}} className="material-symbols-outlined">edit_square</button>
                            </div>
                            <div className="text-xl font-bold text-blue-900">{index+1}. {note.title}</div>
                            <div className="mt-2 text-lg font-serif line-clamp-2">{note.description}</div>
                            <div className="flex justify-between mt-1">
                                <div className="bg-purple-300 text-purple-600 text-sm py-2 px-2 font-medium rounded-full">#{note.tag}</div>
                                <div className=" text-purple-600 text-sm font-medium py-2 rounded-full">{note.date.substring(0,10)}</div>
                            </div>
                        </div>
                        )
                    })}
                    </div>)}
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
                        <textarea type="text" name="description" placeholder="Write your note here..." className="italic rounded-md border-2 border-blue-500 w-full py-1 px-2 h-64" value={description} onChange={handleDesp}/>
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
