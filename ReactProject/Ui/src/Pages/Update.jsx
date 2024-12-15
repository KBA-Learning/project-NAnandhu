import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar2 from "../Components/NavBar2";

const Update = () => {
  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newCategory, setCategory] = useState("");
  const [newLocation, setLocation] = useState("");
  const [newDate, setDate] = useState("");
  const [newBlog, setBlog] = useState("");

  const navigate = useNavigate()

  const { id } = useParams();
  console.log(id);

  const getBlogs = async () => {

    const res = await fetch(`/api/adminBlogs/${id}`, {
      method: 'GET'
    })
    console.log(res);
    const data = await res.json()
    console.log(data);
    const data1 = data.blogdata

    setName(data1.name)
    setEmail(data1.email)
    setCategory(data1.cateogry)
    setLocation(data1.location)
    setBlog(data1.blog)
    setDate(data1.date)


  }
  useEffect(() => {
    getBlogs();
  }, [id])

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const UpdateData = {
      newName,
      newEmail,
      newCategory,
      newLocation,
      newDate,
      newBlog,
    }

    console.log(UpdateData);



    try {
      const response = await fetch(`/api/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      const data = await response.json();
      console.log(data);
      alert("Blog updated successfully!");
      navigate('/viewblog')
    } catch (error) {
      alert("Failed to update blog. Please try again.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="flex justify-center mt-8 p-6">
        <div className="w-full max-w-lg bg-white h-auto rounded-xl shadow-xl shadow-black p-6">
          <form >
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Name:</label>
              <input
                type="text"
                className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
                value={newName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
                value={newEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Category Input */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Category:</label>
              <input
                type="text"
                className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
                value={newCategory}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Location:</label>
              <input
                type="text"
                className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
                value={newLocation}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">Date:</label>
              <input
                type="date"
                className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
                value={newDate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Blog:</label>
              <textarea
                className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
                value={newBlog}
                onChange={(e) => setBlog(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-md font-bold hover:bg-orange-700 focus:ring focus:ring-black"
                onClick={handleUpdateBlog}>
                Update Blog
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default Update;



