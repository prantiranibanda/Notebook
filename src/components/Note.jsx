import React from 'react'
import { useLocation } from "react-router-dom";

const Note = ({ auth, setAuth }) => {
    const location = useLocation();
    const data = location.state;
    return (
        <>
            {(auth === "null") ? <div>Login or sign up</div> :
                (data.note) ? <div>{data.note.description}</div> : <div>You have no notes. Create your notes</div>}
        </>
    )
}

export default Note
