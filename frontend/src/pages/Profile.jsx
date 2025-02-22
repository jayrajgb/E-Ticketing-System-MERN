import React, { useState } from 'react'

const Profile = () => {

  const [userData, setUserData] = useState({
    name: "Jayraj Borate",
    email: "jayrajgborate11@gmail.com",
    phone: "7447292498",
    age: 21,
    gender: "Male",
  })

  const [isEdit, setIsEdit] = useState(true)



  return (
    <div className='max-w-lg flex flex-col gap-2'>
      {
        isEdit ?
          <input type="text" className='bg-gray-100 rounded-sm text-3xl font-medium max-w-60 mt-4' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          :
          <p className='text-neutral-800 text-3xl font-medium mt-4'>{userData.name}</p>
      }
      <hr className='border-neutral-300' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email: </p>
          <p className='text-primary'>{userData.email}</p>
          <p className='font-medium'>Phone: </p>
          {
            isEdit ?
              <input className='bg-gray-100 max-w-52' type="text" maxLength={10} value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              :
              <p className='text-primary'>{userData.phone}</p>
          }

        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Age: </p>
          {
            isEdit ?
              <input className='bg-gray-100 max-w-52' type="number" min={1} value={userData.age} onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))} />
              :
              <p>{userData.age}</p>
          }
          <p className='font-medium'>Gender: </p>
          {
            isEdit ?
              <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              :
              <p>{userData.gender}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit ?
            <button className='rounded-full border border-primary px-8 py-2 hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save</button>
            :
            <button className='rounded-full border border-primary px-8 py-2 hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Profile
