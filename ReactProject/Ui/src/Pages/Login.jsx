import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'

const Login = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      UserName,
      Password
    };
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails),
      credentials: 'include'
    });
    // const data=res.json()
    // console.log(data.result)

    if (res.ok) {
      const data = await fetch('/api/checkrole', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const respones = await data.json()
      console.log(respones);
      alert('Login Successfull')

      if (respones === 'admin') {
        navigate('/adminhome')
      } else {

        navigate('/home');
      }
    } else {
      alert('Login Failed')
    }

  }

  return (
    <>
      <body>
        <div className="bg-purple-100 flex items-center justify-center min-h-screen">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-3xl font-bold text-orange-500 mb-4 text-center">Login</h2>
            <form onSubmit={loginSubmit}>
              <div className="mb-4">
                <label for="email" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-6">
                <label for="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Login
                </button>
                <Link to="#" className="text-purple-700 hover:underline">Forgot Password?</Link>
              </div>
              <p className="text-center">
                Don't have an account?
                <Link to="/Signup" className="text-purple-700 hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </body>

    </>

  )
}
export default Login
