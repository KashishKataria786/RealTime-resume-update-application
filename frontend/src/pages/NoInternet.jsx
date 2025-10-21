import {useEffect, useState} from 'react'
const NoInternet = () => {
  const [isOnline,setIsOnline]= useState(true);
    useEffect(()=>{
      setIsOnline(navigator.onLine);
  
      const handleOnline =()=>setIsOnline(true);
      const handleOffline = ()=>setIsOnline(false);
  
      window.addEventListener('online',handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return()=>{
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    },[])
  
    if(isOnline)return null;
  return (
    <div className="fixed inset-0 bg-[#ffffff]  bg-opacity-95 flex flex-col items-center justify-center z-[9999] space-y-3 ">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">📡</h1>
      <h2 className="text-2xl md:text-  3xl font-semibold mb-6">
        No Internet Connection
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Oops! You seem to be offline. Please check your internet connection and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default NoInternet;
