import React from 'react'

const comment = () => {
  return (
    <>
    <div class="p-8">
            <label for="" class="text-xl font-bold ">Enter Name :</label>
            <input type="text" placeholder="Enter Name" required class="w-[350px] h-10 rounded-xl p-2 "/>
        </div>
        <div class="p-8">
            <label for="" class="text-xl font-bold">Enter Comment :</label>
            <input type="email" placeholder="Enter Email" required class="w-[350px] h-10 rounded-xl p-2"/>
        </div>
    </>
  )
}

export default comment