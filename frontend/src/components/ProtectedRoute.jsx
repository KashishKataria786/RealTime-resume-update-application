import {useNavigate} from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext.jsx';

const ProtectedRoute = ({children}) => {
    const router = useNavigate();

    const {user}= useAuth();

    useEffect(()=>{
        if(!user){
           setTimeout(()=>{
             router('/login');
           },5000)
        }
        return clearTimeout()
    },[user,router])

    if (!user) {
    return (<>
    <div className="fixed inset-0 bg-blue-100  bg-opacity-95 flex flex-col items-center justify-center z-[9999]">
      
      <h1 className="text-3xl font-bold text-black mb-4">
        Not Logged In!
      </h1>

      <p className="text-black  text-center max-w-md">
        It looks like you’re Not Logged In
      </p>
      <p className="text-black mb-6 text-center max-w-md"> Please Login to Access page.</p>
      
    </div>
    </>)
  }

  return children;
}

export default ProtectedRoute
