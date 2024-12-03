import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NavBar2 = () => {
  const navigate=useNavigate()

  const logOut = async () => {
    try {
      // Call the backend logout API
      const response = await fetch('/api/logout');
      console.log(response.message); 

      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.response);
      alert('Failed to log out. Please try again.');
    }
  };
  return (
    <div>
      <nav class="flex justify-between p-5 bg-[#ca8a47] shadow-lg shadow-[#2c2d26]">
                <img src="#" alt="" class=""/>
                <ul class="flex mt-3">
                    <li><Link to="/home" class=" p-5 text-white font-bold text-xl hover:text-black italic">Home</Link></li>
                    <li><Link to="/viewblog" class="p-5 text-white font-bold text-xl hover:text-black italic">My Blog</Link></li>
                    <li><Link to="/addblog" class="p-5 text-white font-bold text-xl hover:text-black italic">Add Blogs</Link></li>
                    {/* <li><Link to="/update/:id" class="p-5 text-white font-bold text-xl hover:text-black italic">Update</Link></li>                     */}
                    <li><Link to="/login" class="p-5 text-white font-bold text-xl hover:text-black italic"onClick={logOut}>Logout</Link></li>
                   
                </ul>
            </nav>
        </div>
  )
}

export default NavBar2