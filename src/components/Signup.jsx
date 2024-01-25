import React, { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleName(event){
    setName(event.target.value)
  }
  function handleEmail(event){
    setEmail(event.target.value)
  }
  function handlePassword(event){
    setPassword(event.target.value)
  }  
  return (
    <div className="w-1/3 bg-purple-100 pt-4 pb-14 px-10 rounded-md border-2 border-gray-300">
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
          <input type="text" name="tag" placeholder="Enter password" className="focus:outline-none border-b-2 border-blue-500 w-full py-1 px-2" value={password} onChange={handlePassword}/>
      </div>
      <div className="text-center bg-purple-600 mt-14 py-2 rounded-md text-white font-semibold hover:cursor-pointer">Sign up</div>
    </div>
  )
}

export default Signup