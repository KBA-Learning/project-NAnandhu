import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar2 from "../Components/NavBar2";

const Update = () => {
  const { BlogId } = useParams();
  const location = useLocation();
  const initialData = location.state.items || {};

  const [newName, setName] = useState(initialData.name || "");
  const [newEmail, setEmail] = useState(initialData.email || "");
  const [newCategory, setCategory] = useState(initialData.category || "");
  const [newLocation, setLocation] = useState(initialData.location || "");
  const [newDate, setDate] = useState(initialData.date || "");
  const [newBlog, setBlog] = useState(initialData.blog || "");

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/ViewBlogs/${BlogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          category: newCategory,
          location: newLocation,
          date: newDate,
          blog: newBlog,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const data = await response.json();
      alert("Blog updated successfully!");
    } catch (error) {
      alert("Failed to update blog. Please try again.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="flex justify-center mt-8 p-6">
  <div className="w-full max-w-lg bg-white h-auto rounded-xl shadow-xl shadow-black p-6">
    <form onSubmit={handleUpdateBlog}>
      {/* Name Input */}
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Name:</label>
        <input
          type="text"
          className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
          value={newName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email Input */}
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

      {/* Location Input */}
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Location:</label>
        <input
          type="text"
          className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
          value={newLocation}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Date Input */}
      <div className="mb-5">
        <label className="block text-gray-700 font-medium mb-2">Date:</label>
        <input
          type="date"
          className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
          value={newDate}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Blog Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Blog:</label>
        <textarea
          className="w-full border-2 rounded-md p-2 hover:border-black focus:ring focus:ring-black"
          value={newBlog}
          onChange={(e) => setBlog(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-md font-bold hover:bg-orange-700 focus:ring focus:ring-black"
        >
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



