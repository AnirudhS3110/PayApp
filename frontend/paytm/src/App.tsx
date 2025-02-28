import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
import {Signup} from "../pages/signup"
import {LandingPage} from "../pages/landing"
import {SignIn} from "../pages/signin"
import {Dashboard} from "../pages/dashboard"
import {Pay} from "../pages/pay"
import {Notifications} from "../pages/notifications"
import {History} from "../pages/history"


function NavBar()
{
  const location = useLocation();
  if(location.pathname === '/dashboard' || location.pathname === '/pay' ||location.pathname === '/notifications' ||location.pathname === '/transactionhistory')
    return null
  return(
    <div className='flex flex-row px-[90px] justify-between  md:px-[140px] w-[100%] '>

        <div className='w-[100px] h-auto pt-[20px] pb-[15px]'>
            <Link to="/"><img src='../images/PayApp.png'/></Link>
        </div>

        <div className='hidden pt-[20px] lg:block'>
          <Link to='/signup' className="font-montserrat pb-[15px] text-[18px] mr-[15px] text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:border-b-[2px] hover:border-b-cyello"> ABOUT US</Link>
          <Link to='/signup' className="font-montserrat pb-[15px] text-[18px] mr-[15px] text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:border-b-[2px] hover:border-b-cyello"> BLOG</Link>
          <Link to='/signup' className="font-montserrat pb-[15px] text-[18px] mr-[15px] text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:border-b-[2px] hover:border-b-cyello"> CONTACT US</Link>
          <Link to='/signup' className="font-montserrat pb-[15px] text-[18px] mr-[15px] text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:border-b-[2px] hover:border-b-cyello"> TRUST & SAFETY</Link>
          
        </div>

        <div className='my-auto transition-all duration-200 hover:bg-cyello hover:bg-opacity-20 rounded-md lg:hidden '>
          <button>
            <img src='../src/assets/hamburger.svg'></img>
          </button>
        </div>
      </div>
  )

}

function App() {
  return(
      <BrowserRouter>
      
      <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path = '/signup' element = {<Signup/>}></Route>
          <Route path = '/signin' element = {<SignIn/>}></Route>
          <Route path = '/dashboard' element ={<Dashboard/>}></Route>
          <Route path = '/pay' element ={<Pay/>}></Route>
          <Route path = '/notifications' element ={<Notifications/>}></Route>
          <Route path = '/transactionhistory' element ={<History/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
