import { useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout.jsx';
import ResumeTemplate from '../components/ResumeTemplate.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { io } from 'socket.io-client'; 
import Spinner from '../components/Spinner.jsx'
const SOCKET_SERVER_URL = 'http://localhost:5005';
const UPDATE_EVENT = 'Resume Updated'; 
import {useResume} from '../context/ResumeContext.jsx'
const DashboardPage = () => {
  // const [data, setData] = useState(null); 
  // const [userEmail, setUserEmail] = useState(''); 
  // const fetchUserData = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     toast.error("Authentication token missing.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get('http://localhost:5005/api/resume/data', {
  //       headers: {
  //         Authorization: `${token}` 
  //       }
  //     });
      
  //     const { resumeData } = response.data; 
  //     setData(resumeData); 
  //     setUserEmail(resumeData?.email); 
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     toast.error("User data could not be retrieved."); 
  //   }
  // }

  // useEffect(() => {
  //   fetchUserData();
  // }, []); 


  // useEffect(() => {

  //   if (!userEmail) return; 
  //   const socket = io(SOCKET_SERVER_URL, {

  //   });

  //   socket.on('connect', () => {
  //       console.log('Socket connected, registering...');

  //       socket.emit('register', userEmail); 
  //   });

  //   socket.on(UPDATE_EVENT, (payload) => {
  //     console.log('Real-time update received:', payload);

  //     if (payload.email === userEmail) {
    
  //         setData(prevData => ({
  //             ...prevData,
  //             courses: payload.updatedCourses 
  //         }));

  //         toast.success(`🎉 New course added: ${payload.name || payload.platform} (Real-time update)`);
  //     }
  //   });
    
  //   return () => {
  //     console.log('Component unmounted, disconnecting socket...');
  //     socket.off(UPDATE_EVENT); 
  //     socket.disconnect();      
  //   };
    
  // }, [userEmail]); 

  const {resumeData}= useResume();

  return (
    <DashboardLayout>
      {resumeData ? (
        <ResumeTemplate user={resumeData} />
      ) : (
        <div className='flex justify-center items-center min-h-screen'><Spinner />Loading resume data...</div> 
      )}
    </DashboardLayout>
  )
}

export default DashboardPage;