import React, { useState } from 'react'
import { Header } from './Header'

const Login = () => {

  const[isSignInForm  , setisSignInForm]  =useState(true)

const toggleSignInForm =()=>{
setisSignInForm(!isSignInForm)
}


  return (
    <div className=' '> 
        <Header />

       <div className='absolute'>
   <img  src='https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg  ' 
   alt='logo'
    />
        </div> 
<form className='absolute   w-3/12  p-12 bg-black mx-auto right-0 left-0  my-36  text-white  bg-opacity-80'>
    <h1   className='font-bold  text-3xl py-4'>  {isSignInForm ? "Sign In" : "Sign Up" }  </h1>

{
  !isSignInForm && <input  className='w-full   p-4 my-4 bg-gray-700'  type='text'  placeholder='Full Name' />
}
    <input  className='w-full   p-4 my-4 bg-gray-700'  type='text' placeholder='Email Address' />
    <input  className='w-full   p-4 my-4 bg-gray-700'  type='password'  placeholder='Password'   />
    <button className='w-full bg-red-700   p-4   my-6  rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
    <p className='py-4'  onClick={toggleSignInForm}>
      {
        isSignInForm ?  "New to Netflix ? Sign Up Now" : "Already Registered ? Sign In Now "
      }
      
      </p>
</form>

    </div>
  )
}

export default Login