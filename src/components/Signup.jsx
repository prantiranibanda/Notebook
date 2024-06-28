import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = ({auth, setAuth}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openeye, setOpeneye] = useState(false);
  
  const navigate = useNavigate();

  function handleName(event){
    setName(event.target.value)
  }
  function handleEmail(event){
    setEmail(event.target.value)
  }
  function handlePassword(event){
    setPassword(event.target.value)
  } 

  async function createUser(){
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    })
    let resp = await response.json();
    if (resp.success) {
      setAuth(resp.authToken);
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    }
    else {
      console.warn("Not Signed up");
      for (let i = 0; i < resp.errors.length; i++) {
        const err = resp.errors[i];
        console.log(err.msg);
      }
    }
  }
  // function storeUserData(){
  //   let data = {}
  //   data.name = name;
  //   data.email = email;
  //   data.password = password;
  //   createUser(data);
  // }
  return (<>
    <div className="flex justify-center mt-24">
      <div className="w-1/4 bg-purple-100 pt-4 pb-10 px-6 rounded-md border-2 border-gray-300">
      <div className="text-center font-bold text-xl text-blue-900 pb-7">Create New Account</div>
      <div className="mb-4">
          <div className="font-bold pb-2 text-purple-600">NAME:</div>
          <input type="text" name="title" placeholder="Enter your name" className="focus:outline-none border-b-2 border-blue-500 w-full py-1 px-2" value={name} onChange={handleName}/>
      </div> 
      <div className="mb-4">
          <div className="font-bold pb-2 text-purple-600">EMAIL:</div>
          <input type="text" name="description" placeholder="Enter your email" className="focus:outline-none border-b-2 border-blue-500 w-full py-1 px-2" value={email} onChange={handleEmail}/>
      </div>
      <div className="mb-4">
          <div className="font-bold pb-2 text-purple-600">PASSWORD:</div>
          <div className="flex">
            <input type={openeye?"text":"password"} name="tag" placeholder="Enter password" className="focus:outline-none border-b-2 border-blue-500 w-full py-1 px-2" value={password} onChange={handlePassword} />
            <button className="material-symbols-outlined bg-white border-b-2 border-blue-500 pr-2" onClick={()=>{setOpeneye(!openeye)}}>{openeye?"visibility":"visibility_off"}</button>
          </div>
        </div>
      <div className="text-center bg-purple-600 mt-14 py-2 rounded-md text-white font-semibold hover:cursor-pointer" onClick={createUser}>Sign up</div>
    </div>
    </div>
        <div className="text-sm text-center p-4">Already have an account? <span className="text-blue-600 underline hover:cursor-pointer" onClick={()=>{navigate("/login")}}>Login</span></div>
    </>
  )
}

export default Signup