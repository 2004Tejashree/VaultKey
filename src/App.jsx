import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

function App() {
  const [currentView, setCurrentView] = useState('manager');

  const navigateTo = (view) => {
    setCurrentView(view);
  }

  // Check auth on mount to redirect to login if needed, or stay on manager
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentView('login');
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar navigateTo={navigateTo} currentView={currentView} />
      <div className='fixed inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
      </div>

      {currentView === 'manager' && <Manager navigateTo={navigateTo} />}
      {currentView === 'login' && <Login navigateTo={navigateTo} />}
      {currentView === 'register' && <Register navigateTo={navigateTo} />}
      {currentView === 'profile' && <Profile navigateTo={navigateTo} />}

      <Footer />
    </>
  )
}

export default App
