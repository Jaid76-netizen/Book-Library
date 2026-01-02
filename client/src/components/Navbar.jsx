import React from 'react'
import {useNavigate} from "react-router-dom";

// BookName> BookTitle> AuthorName> SellingPrice> PublishDate

function Navbar() {

const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("userAuth");
  navigate("login");
 }

  return (
    <div className='w-full flex justify-between h-15 items-center bg-gray-600 shadow px-5'>
        <div className="w-[10%] flex items-center h-full">
            <h1 className='font-bold text-zinc-800'>LOGO</h1>
        </div>
        <div className="w-[50%] h-full">
            <ul className="w-full h-full flex gap-6 list-none items-center text-zinc-800 font-medium">
                <li className='cursor-pointer'>HOME</li>
                <li className='cursor-pointer'>ABOUT</li>
                <li className='cursor-pointer'>CONTACT</li>

            </ul>

             
        </div>
        <button className="py-1 px-4 bg-orange-500 rounded text-white cursor-pointer" onClick={handleLogout}>Login</button>
    </div>
  )
}

export default Navbar