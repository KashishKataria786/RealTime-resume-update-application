import {useNavigate} from 'react-router-dom'
const NotLoggedIn = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col min-h-screen items-center justify-center text-blue-600'>
      <h1>Not Logged in</h1>
      <h2>Login to access content</h2>
      <button onClick= {()=>navigate('/login')} className='mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out'>
        Go to Login Page
      </button>
    </div>
  )
}

export default NotLoggedIn