// import React from 'react';
// import tv from '../assets/Pimage/trvb.jpg';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const View = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Safely extract `items` from `location.state`
//   const items = location.state.items;

//   const deleteBlog = async () => {
//     if (!items.blogid) {
//         alert('Invalid Blog ID');
//         return;
//     }

//     const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
//     if (!confirmDelete) return;

//     try {
//         console.log(`Deleting blog with ID: ${items.blogid}`);
//         const res = await fetch(`/api/detele/${items.blogid}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         console.log('Response:', res);

//         if (res.ok) {
//             alert('Blog deleted successfully');
//             navigate('/viewblog');
//         } else {
//             const data = await res.json();
//             console.log('Error Response:', data);
//             alert(data.message || 'Error deleting blog');
//         }
//     } catch (error) {
//         // console.log('Delete Error:', error);
//         alert('An unexpected error occurred while deleting the blog.');
//     }
// };

//   return (
//     <>
//       <div className="flex">
//         <div className="w-[500px] h-auto m-5">
//           <img src={tv} alt="Preview" />
//         </div>
//         <div className="mt-8">
//           <p className="p-2 font-bold">Name: {items.name || 'N/A'}</p>
//           <p className="p-2 font-bold">Email: {items.email || 'N/A'}</p>
//           <p className="p-2 font-bold">Category: {items.cateogry || 'N/A'}</p>
//           <p className="p-2 font-bold">Location: {items.location || 'N/A'}</p>
//           <p className="p-2 font-bold">Date: {items.date || 'N/A'}</p>
//         </div>
//       </div>
//       <div>
//         <h1 className="font-bold m-3">Blog</h1>
//         <p>{items?.blog || 'N/A'}</p>
//       </div>
//       <div className="flex justify-end">
//         <div className="m-3">
//           <button
//             className="bg-orange-500 w-28 h-12 border-2 hover:bg-orange-400 hover:border-black"
//             onClick={deleteBlog}
//           >
//             Remove
//           </button>
//         </div>
//         <div className="m-3">
//           <button  className="bg-orange-500 w-28 h-12 border-2 hover:bg-orange-400 hover:border-black">
//            <Link to={`/update/${items.blogid}`}>Edit</Link>  
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default View;

import React from 'react';
import tv from '../assets/Pimage/trvb.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely extract `items` from `location.state`
  const items = location.state.items || {};

  const deleteBlog = async () => {
    if (!items.blogid) {
      alert('Invalid Blog ID');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/detele/${items.blogid}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        alert('Blog deleted successfully');
        navigate('/viewblog');
      } else {
        const data = await res.json();
        alert(data.message || 'Error deleting blog');
      }
    } catch (error) {
      alert('An unexpected error occurred while deleting the blog.');
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[500px] h-auto m-5">
          <img src={tv} alt="Preview" />
        </div>
        <div className="mt-8">
          <p className="p-2 font-bold">Name: {items.name || 'N/A'}</p>
          <p className="p-2 font-bold">Email: {items.email || 'N/A'}</p>
          <p className="p-2 font-bold">Category: {items.cateogry || 'N/A'}</p>
          <p className="p-2 font-bold">Location: {items.location || 'N/A'}</p>
          <p className="p-2 font-bold">Date: {items.date || 'N/A'}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold m-3">Blog</h1>
        <p>{items?.blog || 'N/A'}</p>
      </div>
      <div className="flex justify-end">
        <div className="m-3">
          <button
            className="bg-orange-500 w-28 h-12 border-2 hover:bg-orange-400 hover:border-black"
            onClick={deleteBlog}
          >
            Remove
          </button>
        </div>
        <div className="m-3">
          <Link
            to={`/update/${items.blogid}`}
            state={{ items }}
            className="bg-orange-500 w-28 h-12 border-2 hover:bg-orange-400 hover:border-black flex justify-center items-center"
          >
            Edit
          </Link>
        </div>
      </div>
    </>
  );
};

export default View;

