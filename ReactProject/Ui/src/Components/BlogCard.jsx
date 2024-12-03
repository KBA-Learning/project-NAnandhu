import React, { useState } from 'react';
import profile from '../assets/Pimage/profile.png';
import tv from '../assets/Pimage/trvb.jpg';
import { Link, useNavigate } from 'react-router-dom';

const BlogCard = ({ items }) => {
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const getDescription = () => {
        const maxLength = 100;
        if (!items.blog) return 'No description available.';
        if (showFullDescription || items.blog.length <= maxLength) {
            return items.blog;
        } else {
            return items.blog.substring(0, maxLength) + '...';
        }
    };

    const handleView = () => {
        navigate('/view', { state: { items } });
    };
    return (
        <div className="flex">
            <div className="mt-2 m-5">
                <h2 className="text-xl font-bold m-2">My Blog</h2>
                <img src={tv} className="hover:opacity-70 w-auto h-[300px]" alt="Blog Cover" />
            </div>
            <div>
                <div className="mt-8 m-5 w-96 h-52 overflow-auto">
                    <p className="text-xl p-3">{getDescription()}</p>
                    {items.blog.length > 100 && (
                        <button
                            className="text-blue-500 hover:underline mt-2"
                            onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                            {showFullDescription ? 'Show less' : 'Show more'}
                        </button>
                    )}
                </div>

                <div className="flex">
                    <div>
                        <img src={profile} className="w-16 h-16" alt="Profile" />
                    </div>
                    <div className="m-2">
                        <p className="font-bold">Name: {items.name || 'Anonymous'}</p>
                        <p>Category: {items.cateogry || 'Uncategorized'}</p>
                        <p>Latest Update: {items.date || 'N/A'}</p>
                        <p>Location: {items.location || 'Unknown'}</p>
                        <Link href="/comment" className="text-sky-500">
                            Leave a comment
                        </Link>
                        <button
                            className="w-20 h-8 bg-orange-500 text-black text-xl mt-5 hover:border-black hover:bg-orange-400 border-2"
                            onClick={handleView}>View</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
