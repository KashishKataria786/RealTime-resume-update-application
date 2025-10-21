import { createContext, useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from 'socket.io-client'; 
import Spinner from '../components/Spinner.jsx'
const SOCKET_SERVER_URL = `${import.meta.env.VITE_SOCKET_SERVER_URL}`
const UPDATE_EVENT = 'Resume Updated'; 
const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
 const [userEmail, setUserEmail] = useState(''); 

  const fetchResumeData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/resume/data`, {
        headers: {
          Authorization: `${token}` 
        }
      });
      
      const { resumeData } = response.data; 
      setResumeData(resumeData); 
      setUserEmail(resumeData?.email); 
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("User data could not be retrieved."); 
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchResumeData();
  }, [fetchResumeData]);

  useEffect(() => {

    if (!userEmail) return; 
    const socket = io(SOCKET_SERVER_URL, {

    });

    socket.on('connect', () => {
        console.log('Socket connected, registering...');

        socket.emit('register', userEmail); 
    });

    socket.on(UPDATE_EVENT, (payload) => {
      console.log('Real-time update received:', payload);

      if (payload.email === userEmail) {
    
          setResumeData(prevData => ({
              ...prevData,
              courses: payload.updatedCourses 
          }));

          toast.success(`🎉 New course added: ${payload.name || payload.platform} (Real-time update)`);
      }
    });
    
    return () => {
      console.log('Component unmounted, disconnecting socket...');
      socket.off(UPDATE_EVENT); 
      socket.disconnect();      
    };
    
  }, [userEmail]); 

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        loading,
        refreshResumeData: fetchResumeData, 
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
