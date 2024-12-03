import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
const Grid = ({ isHome }) => {
  const [blogs, setBlogs] = useState([]); 
  const blogList = isHome ? blogs.slice(0,3) : blogs; 

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch('/api/ViewBlogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        console.log(data.blogdata);
        
        setBlogs(data.blogdata);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogDetails();
  }, []);
  return (
    <>  
    <div className="ml-[150px] mt-[100px] w-[1000px] h-auto shadow-xl shadow-gray-300 p-5">
      {Array.isArray(blogList) && blogList.length > 0 ? (
        blogList.map((item) => (
          <BlogCard key={item.BlogId} items={item} />
        ))
      ) : (
        <p>Loading blogs...</p> 
      )}
    </div>
    </>
  );
};

export default Grid;
