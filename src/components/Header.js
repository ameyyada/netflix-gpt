import React from 'react'
import {  signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';


export const Header = () => {
const navigate = useNavigate()
const user = useSelector((store) => store.user)




const handleSignOut = () => {
    
signOut(auth).then(() => {

navigate("/")
  // Sign-out successful.
}).catch((error) => {
  navigate("/error")

  // An error happened.
});


  }



  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black  z-10 w-screen flex justify-between' >
        <img  className='w-44' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo' />


{
  user && <div  className='flex  p-2'>
         
            <img   className=' w-12 h-12' alt='user-icon'  src={user.photoURL}/>
          <button   onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        
        
        </div>
}
        
    </div>
  )
}
