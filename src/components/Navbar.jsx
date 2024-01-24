import React from 'react'

const Navbar = () => {
  return (
    <div className="flex space-x-7 bg-blue-950 text-white p-4 items-center">
      <div className="text-2xl font-bold">iNotebook</div>
      <div className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">Home</div>
      <div className="text-gray-400 font-semibold hover:text-white hover:cursor-pointer text-lg">About</div>
    </div>
  )
}

export default Navbar
