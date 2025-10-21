import './App.css'
import { Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='*' element={<NotFound/>}/>

      <Route path='/dashboard' element= {<DashboardPage/>}/>

      </Routes>
    </>
  )
}

export default App
