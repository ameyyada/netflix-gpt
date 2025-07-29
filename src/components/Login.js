import React, { useRef, useState } from 'react'
import { Header } from './Header'
import { checkValidData } from '../utils/validate'
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {  updateProfile } from "firebase/auth";
import { useSelector } from 'react-redux';


const Login = () => {
  const navigate =useNavigate()


  const[isSignInForm  , setisSignInForm]  =useState(true)
  const[ErrorMessage , setErrorMessage]= useState(null)


const name = useRef(null) 
const email = useRef(null)
const password  = useRef(null)



const toggleSignInForm =()=>{
setisSignInForm(!isSignInForm)
}






const handleButtonClick =()=>{
  //console.log(email.current.value)
  // console.log(password.current.value)
const Message =  checkValidData(email.current.value , password.current.value)

//console.log(Message)
setErrorMessage(Message)
if(Message) return

if(!isSignInForm) {
//signup logic

createUserWithEmailAndPassword(auth, email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed up 


    const user = userCredential.user;

    updateProfile(user, {
  displayName: name.current.value, photoURL: "https://media.naukri.com/media/jphotov1/l244%253ALukcMTmz2woYE7u5VwgEbpk%252Fx38paMQ7g1t73KS%252B3vCF%252BeCbx3eiaAtoWSHE"
}).then(() => {
  // Profile updated!
  navigate("/browse")
  // ...
}).catch((error) => {
  // An error occurred
  setErrorMessage(error.message)
  // ...
});
console.log(user)


    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode +"-"+errorMessage)
    setErrorMessage(errorCode +"-"+errorMessage)
    // ..
  });
}
else {
  signInWithEmailAndPassword(auth,  email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode +"-"+errorMessage)
     setErrorMessage(errorCode +"-"+errorMessage)
  });


}

}





  return (
    <div className=' '> 
        <Header />

       <div className='absolute'>
   <img  src='https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg  ' 
   alt='logo'
    />
        </div> 
<form   onSubmit={(e)=> e.preventDefault()} className='absolute   w-3/12  p-12 bg-black mx-auto right-0 left-0  my-36  text-white  bg-opacity-80'>
    <h1   className='font-bold  text-3xl py-4'>  {isSignInForm ? "Sign In" : "Sign Up" }  </h1>

{
  !isSignInForm && <input   ref={name}  className='w-full   p-4 my-4 bg-gray-700'  type='text'  placeholder='Full Name' />
}

    <input   ref={email} className='w-full   p-4 my-4 bg-gray-700'  type='text' placeholder='Email Address' />
    <input     ref={password} className='w-full   p-4 my-4 bg-gray-700'  type='password'  placeholder='Password'   />

    <p  className=  ' font-bold text-lg text-red-500'>{ErrorMessage }</p>

    <button className='w-full bg-red-700   p-4   my-6  rounded-lg'   onClick={handleButtonClick} >{isSignInForm ? "Sign In" : "Sign Up"}</button>
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