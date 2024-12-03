import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
// import {toast} from 'react-toastify'
const SignupPage = () => {
    const [FirstName,setFirstName]=useState('')
    const [LastName,setLastName]=useState('')
    const [UserName,setUserName]=useState('')
    const [Password,setPassword]=useState('')
    const [Role,setRole]=useState('admin')
    const navigate=useNavigate();

    const signupSubmit = async(userDetails)=>{
        const res = await fetch('/api/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(userDetails),
        });
        if(res.ok){
            // toast.success('signup Successfull')
            alert('signup Successfull')
            navigate('/login');
        }else{
          alert('Error')
            // toast.error('error')
        }
    }

    const submitForm =(e)=>{
        e.preventDefault();
        const userDetails={
            FirstName,
            LastName,
            UserName,
            Password,
            Role
        }
        signupSubmit(userDetails)
    }

  return (
    <div className="bg-purple-100 flex items-center justify-center min-h-screen">
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-3xl font-bold text-orange-500 mb-4 text-center">Sign Up</h2>
      <form onSubmit={submitForm}>
        <div className="mb-4">
          <label for="name" className="block text-gray-700 font-bold mb-2">FirstName:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={FirstName}
            onChange={(e)=>setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label for="email" className="block text-gray-700 font-bold mb-2">LastName:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={LastName}
            onChange={(e)=>setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label for="password" className="block text-gray-700 font-bold mb-2">UserName:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={UserName}
            onChange={(e)=>setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label for="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4">
          <label for="userType" className="block text-gray-700 font-bold mb-2">User Type:</label>
          <select
            id="userType"
            name="userType"
            value={Role}
            onChange={(e)=>setRole(e.target.value)}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-purple-700 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default SignupPage
