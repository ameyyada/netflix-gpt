import React, { useRef, useState } from 'react'
import { Header } from './Header'
import { checkValidData } from '../utils/validate'
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';

import {  updateProfile } from "firebase/auth";
import { useDispatch,  } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR } from '../utils/constants';


const Login = () => {
  
  const dispatch =useDispatch()
  const navigate = useNavigate()


  const[isSignInForm  , setisSignInForm]  =useState(true)
  const[ErrorMessage , setErrorMessage]= useState(null)
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")






const toggleSignInForm =()=>{
setisSignInForm(!isSignInForm)
}






const handleButtonClick =()=>{
  const Message = checkValidData(emailValue, passwordValue);
  setErrorMessage(Message);
  if (Message) return;

  if (!isSignInForm) {
    // Signup logic
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then( async (userCredential) => {
        // Signed up
        const user = userCredential.user;
   await updateProfile(user, {
  displayName: nameValue, photoURL: USER_AVATAR
}).then( () => {
    const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
  // Profile updated!
  // ...
})
.catch((error) => {
  // An error occurred
   setErrorMessage(error.message);
  // ...
});

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  } else {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
       // console.log(user);
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
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
  !isSignInForm && <input   value={nameValue}  onChange={(e)=>setNameValue(e.target.value)} className='w-full   p-4 my-4 bg-gray-700'  type='text'  placeholder='Full Name' />
}

    <input  value={emailValue} onChange={(e)=>setEmailValue(e.target.value)} className='w-full   p-4 my-4 bg-gray-700'  type='text' placeholder='Email Address' />
    <input     value={passwordValue} onChange={(e)=>setPasswordValue(e.target.value)} className='w-full   p-4 my-4 bg-gray-700'  type='password'  placeholder='Password'   />

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