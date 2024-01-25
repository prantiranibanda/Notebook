import React from 'react'

const Navbar = () => {
  return (
    <div className="flex space-x-7 bg-blue-950 text-white py-4 px-8 items-center">
      <div className="text-2xl font-bold">iNotebook</div>
      <div className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Home</div>
      <div className="flex space-x-7 justify-end w-full">
        <div className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Login</div>
        <div className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Sign Up</div>
      </div>
    </div>
  )
}

export default Navbar
