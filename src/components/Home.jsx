import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

let nt;
const Home = ({auth}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState("")
    const [notes, setNotes] = useState([])
    const [hid, setHid] = useState(true)
    const [displayNote, setDisplayNote] = useState(true)
    const [heading, setHeading] = useState()
    const [content, setContent] = useState()

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
        setHeading(resp.note.title);
        setContent(resp.note.description);
        setDisplayNote(false);
    }

    function saveChanges(){
        handleUpdate(nt[0]._id);
        setHid(true);
        setTitle("");
        setDescription("");
        setTag("");
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
        <div className='relative'>
            <div className={`flex justify-center ${hid?"":"blur-lg"} ${displayNote?"":"blur-lg"}`}>
                <div className="w-2/3"> 
                    <div className="py-3 text-4xl text-blue-900 font-bold my-6 border-b-2 border-orange-400">Add Note</div>     
                    
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
                        <div className='p-3 flex justify-end'><div className="w-1/6 py-3 bg-purple-500 rounded-md text-center text-white font-medium hover:cursor-pointer" onClick={createNote}>ADD NOTE</div>
                        </div>
                    </div>

                    {((notes.length!==0) &&
                    <div>
                        <div className="py-3 text-4xl text-blue-900 font-bold mt-10 mb-5 border-b-2 border-orange-500">Your Notes</div>
                        <div className='grid grid-cols-3 gap-5 mb-10'>
                        {notes.map((note, index)=>{
                        return (
                        <div     
                        className="flex flex-col justify-between bg-purple-50 hover:cursor-pointer hover:bg-purple-100 py-5 px-5 hover:shadow-md hover:shadow-purple-900/50 border border-purple-500 rounded-lg"
                        key={note._id}>
                            <div className="flex space-x-3 text-purple-900 justify-end"> 
                                <button onClick = {()=>{handleDelete(note._id)}} className="material-symbols-outlined">delete</button>
                                <button onClick = {()=>{editNote(note._id)}} className="material-symbols-outlined">edit_square</button>
                            </div>
                            <div onClick={()=>{showOneNote(note._id)}} className="text-xl font-bold line-clamp-1 text-blue-900">{index+1}. {note.title}</div>
                            <div onClick={()=>{showOneNote(note._id)}} className="text-lg font-serif line-clamp-2 h-14">{note.description}</div>
                            <div onClick={()=>{showOneNote(note._id)}} className="flex justify-between items-end">
                                <div className=" bg-purple-300 text-purple-600 text-sm py-1 px-2 rounded-full font-medium ">#{note.tag}</div>
                                <div className=" text-purple-600 text-xs">{note.date.substring(0,10)}</div>
                            </div>
                        </div>
                        )
                    })}
                    </div></div>)}
                </div>
            </div>
            <div className={`fixed top-0 w-full h-full flex justify-center ${hid?"hidden":""}`}>
                <div className='h-full w-full bg-[#87668d8b] -z-10 absolute'></div>
                <div className="w-1/2 h-fit mt-10 z-5 opacity-100 px-4 py-10">
                    <div className="text-3xl text-center font-bold">Edit Notes</div>  
                    <div className="py-3 px-10 rounded-t-lg bg-purple-100 my-1">
                        <div className="text-xl font-bold pb-2 text-purple-600">Title:</div>
                        <input type="text" name="title" placeholder="Give a title" className="italic rounded-md border border-blue-500 w-full py-1 px-2" value={title} onChange={handleTitle}/>
                    </div> 
                    <div className="py-3 px-10 bg-purple-100 my-1">
                        <div className="text-xl font-bold pb-2 text-purple-600">Description:</div>
                        <textarea type="text" name="description" placeholder="Write your note here..." className="italic rounded-md border border-blue-500 w-full py-1 px-2 h-52" value={description} onChange={handleDesp}/>
                    </div>
                    <div className="pt-3 pb-6 px-10 rounded-b-lg bg-purple-100 my-1">
                        <div className="text-xl font-bold pb-2 text-purple-600">Tag:</div>
                        <input type="text" name="tag" placeholder="Give a Tag" className="italic rounded-md border border-blue-500 w-full py-1 px-2" value={tag} onChange={handleTag}/>
                    </div>
                    <div className='p-3 flex justify-center'><div className="hover:cursor-pointer px-3 py-3 bg-purple-500 rounded-md text-center text-white font-medium" onClick={saveChanges}>SAVE CHANGES</div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 w-full h-full flex justify-center ${displayNote?"hidden":""}`}>
                <div className='h-full w-full bg-[#87668d8b] -z-10 absolute' onClick={()=>{setDisplayNote(true)}}></div>
                <div className="w-2/5 h-fit min-h-96 mt-14 z-5 opacity-100 p-6 bg-purple-100 rounded-lg">
                    <div className="text-center text-blue-900 text-3xl pb-3 font-bold border-b-2 border-white">{heading}</div>
                    <div className="pt-3">{content}</div>
                </div>
            </div>
        </div>
    )
}

export default Home
