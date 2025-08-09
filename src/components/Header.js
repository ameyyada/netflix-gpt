import React, { useEffect } from 'react'
import {  onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';



export const Header = () => {
const navigate = useNavigate()
const dispatch =useDispatch()
const User = useSelector((store) => store.user)




const handleSignOut = () => {
    
signOut(auth).then(() => {

// navigate("/")
  // Sign-out successful.
}).catch((error) => {
  navigate("/error")

  // An error happened.
});

  }




  useEffect(()=>{
         //in firebase documentation auth state change listener has unsubscribe method
         // so we can use it to unsubscribe the listener when component unmounts
         //if we call this unsubscribe method in useEffect cleanup function
         //then it will remove the onAuthStateChanged listener from browser
          const unsubscribe=  onAuthStateChanged(auth, (user) => {
           if (user) {
             // User is signed in,
         
            
             const {uid,email ,displayName ,photoURL} = user
             
             dispatch(addUser({uid :uid, email : email, displayName : displayName , photoURL : photoURL}))
            
             navigate("/browse")
             
             
             
           } else {
             // User is signed out
             
             // ...
             dispatch(removeUser()) 
             navigate("/")
             
             
             
             
           }
         });


         return ()=> unsubscribe()
         
         },[])
   





  



  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black  z-10 w-screen flex justify-between' >
        <img  className='w-44' src={LOGO} alt='logo' />


{
  User && <div  className='flex  p-2'>
         
            <img   className=' w-12 h-12' alt='user-icon'  src={User.photoURL}/>
          <button   onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        
        
        </div>
}
        
    </div>
  )
}
