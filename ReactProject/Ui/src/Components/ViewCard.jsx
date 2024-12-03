import React from 'react'

const ViewCard = () => {
  return (
    <>
     <div className='flex'>
      <div className='w-[500px] h-auto m-5'>
         <img src={tv} alt="" />
      </div>
       <div className='mt-8'>
        <h1 className='p-2 font-bold'>Name:</h1>
        <p className='p-2 font-bold'>Email:</p>
        <p className='p-2 font-bold'>Category:</p>
        <p className='p-2 font-bold'>Location:</p>
        <p className='p-2 font-bold'>Date:</p>
       </div>
    </div>
    <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam eaque odit magni iste sunt, commodi laborum, debitis fugiat itaque error, beatae nostrum vero vel minus placeat dolores temporibus quas tempora?</p>
   </div>
    </>
  )
}

export default ViewCard