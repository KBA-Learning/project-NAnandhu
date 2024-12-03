import React from 'react'
// import {Link} from 'react-router-dom'
const NavBar = () => {
  return (
    <>
    <div className='flex justify-between m-5 '>
        <div>
            <h1 className='font-bold text-xl m-2'>My Blogs</h1>
        </div>
        <div className='m-3 flex space-x-4 px-5'>
            <div className='w-14'>
            <a href="/login"className='m-3 text-xl hover:text-orange-600'>Login</a>
            </div>
            <div className='w-14'>
            <a href="/signup" className='m-3 text-xl hover:text-orange-600'>Resigter</a>
            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar