import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlogs = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Category, setCategory] = useState('');
    const [Location, setLocation] = useState('');
    const [BlogDate, setBlogDate] = useState(''); // Renamed state for date
    const [Blog, setBlog] = useState('');
    const [Blogid, setBlogid] = useState('');

    const navigate = useNavigate();
    
    // Set the current date when the component mounts
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        setBlogDate(currentDate);

        // Generate a unique blogId (timestamp + random number)
        const uniqueBlogId = `blog-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        setBlogid(uniqueBlogId);
    }, []);
    
    const SubmitForm = async (e) => {
        e.preventDefault();
        const newBlog = {
            Name,
            Email,
            Category,
            Location,
            Date: BlogDate, // Updated to use BlogDate
            Blog,
            Blogid,
        };

        try {
            const response = await fetch('/api/addblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });
            console.log(newBlog);
            
            if (response.ok) {
                alert('Blog Added Successfully');
                setName('');
                setEmail('');
                setCategory('');
                setLocation('');
                setBlog('');
                setBlogid('');
                setBlogDate('');
                navigate('/viewblog');
            } else {
                const errorData = await response.json();
                alert(`Failed to add: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-auto h-auto rounded-xl shadow-xl shadow-black">
                <div className="px-5 mx-5">
                    <div className="p-5 m-5">
                        <h3 className="text-center text-2xl font-bold text-orange-600">Add Blog</h3>
                    </div>
                    <form onSubmit={SubmitForm}>
                        <div className="p-5 m-5">
                            <label htmlFor="name" className="block mb-2">Blog Name:</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter Name"
                                required
                                value={Name}
                                className="w-[275px] border-2 hover:border-black"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="p-5 m-5">
                            <label htmlFor="email" className="block mb-2">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter Email"
                                required
                                value={Email}
                                className="w-[279px] border-2 hover:border-black"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="p-5 m-5">
                            <label htmlFor="category" className="block mb-2">Category:</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter Category"
                                required
                                value={Category}
                                className="w-64 border-2 hover:border-black"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="p-5 m-5">
                            <label htmlFor="location" className="block mb-2">Location:</label>
                            <input
                                id="location"
                                type="text"
                                placeholder="Enter Location"
                                required
                                value={Location}
                                className="w-64 border-2 hover:border-black"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="p-5 m-5">
                            <label htmlFor="blogDate" className="block mb-2">Date:</label>
                            <input
                                id="blogDate"
                                type="date"
                                required
                                value={BlogDate}
                                className="w-64 border-2 hover:border-black"
                                readOnly
                            />
                        </div>
                        <div className="p-5 m-5">
                            <label htmlFor="blogid" className="block mb-2">Blog Id:</label>
                            <input
                                id="blogid"
                                type="text"
                                required
                                value={Blogid}
                                className="w-64 border-2 hover:border-black"
                                readOnly
                            />
                        </div>
                        <div className="p-5 m-5">
                            <label htmlFor="blog" className="block mb-2">Add Blog:</label>
                            <textarea
                                id="blog"
                                placeholder="Enter Your Blog"
                                required
                                value={Blog}
                                className="w-full border-2 hover:border-black"
                                onChange={(e) => setBlog(e.target.value)}
                            />
                        </div>
                        <div className="p-5 m-5">
                            <button
                                type="submit"
                                className="bg-orange-600 text-black w-28 h-10 font-bold ring-2 hover:ring-black"
                            >
                                Add Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddBlogs;
