import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const handleGoogleClick=async(req,res)=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app)
            const result=await signInWithPopup(auth,provider)
            // console.log(result)
            
            const res=await fetch('api/auth/goggle',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email:result.user.email,
                    name: result.user.displayName,
                    photo:result.user.photoURL,
                }),
            })

            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate('/')

        } 
        catch (error) {
            console.log('could not login with google',error)    
        }
    }


  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 '>Continue with google    
    </button>
  )
}

export default OAuth
