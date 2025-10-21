import { useNavigate } from 'react-router-dom';
// Removed the react-icons import to resolve compilation issue. Using a simple text logo instead.
import { useAuth } from '../../context/AuthContext'; 

const Header = () => {

  const navigate = useNavigate();
  // Get authentication state and functions from context
  const { loggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="w-full sticky top-0 left-0 z-40 bg-white border-b border-gray-100 ">
      <div className=" px-4 py-2 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex gap-4 items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
          {/* Replaced PiReadCvLogoFill with a simple text icon/emoji to resolve import error */}
          <span className="text-2xl" role="img" aria-label="Resume icon">📄</span> 
          <span className="text-xl font-semibold text-blue-500 tracking-tight">
            Resume-board
          </span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-light">
            <li className="hover:text-blue-500 transition cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Features</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Integrations</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Pricing</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Contact</li>
          </ul>
        </nav>

        {/* Auth Buttons / User Info - Conditional Rendering */}
        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              {/* Display user identifier (assuming 'email' or 'username' is available in the JWT payload) */}
              
              <button 
                onClick={handleLogout} 
                className="px-4 py-1 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-400 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="px-4 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-sm hover:bg-gray-100 transition">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="px-4 py-1 text-sm font-medium bg-blue-500 text-white rounded-sm hover:bg-blue-400 transition">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
