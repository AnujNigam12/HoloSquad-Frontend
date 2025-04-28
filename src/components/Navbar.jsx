import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext';
import ProfileButton from './ProfileButton';
import { FaLocationDot } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { IoNotificationsCircle } from "react-icons/io5";
import Logo from '../assets/Logo.jpeg'

const Navbar = () => {
      const [search, setSearch] = useState([]);
      const [inputValue, setInputValue] = useState(''); // Track input value


      let ctx = useContext(UserContext);

      //    console.log(ctx)
      const navigate = useNavigate();
      // const [isLoggedIn, setIsLoggedIn] = useState(true);
      const handleRegister = () => {
            navigate("/signup")
      }

      const handleNameChange = async (e) => {
            //      console.log(e.target.name); 
            //      console.log(e.target.value)
            const value = e.target.value;
            setInputValue(value); // Update input value state

            //   let res = await fetch(url + `/users/getUserBySearch?q=${value}`,{
            let res = await fetch(`https://holosquad-backend.onrender.com/users/getUserBySearch?q=${value}`, {

                  method: "GET",
                  headers: {
                        "Content-Type": "application/json"
                  }
            });

            let data = await res.json();
            let newData = data.filter((item) => item._id !== ctx.user.userId)
            console.log(newData);
            //   console.log(data);
            setSearch(newData);
      }

      const handleLinkClick = () => {
            setSearch([]); // Clear search results
            setInputValue(''); // Clear input field
      };
      //   console.log(search);

      return (
            <div className="container h-[55px] fixed top-0 left-0 right-0 z-50 mx-auto flex flex-wrap px-5 flex-col md:flex-row items-center rounded-lg" style={{ background: 'linear-gradient(to left, #011425, #1F4959)' }}>
                  <Link to={"/"} className="flex title-font justify-center font-medium items-center text-gray-900 mb-5 md:mb-0">
                        <img src={Logo} alt="Logo" className='rounded-3xl' style={{ height: '50px' }} />
                        <div>
                        <span className="ml-3 bg-gradient-to-r from-blue-800 to-green-500 bg-clip-text text-transparent text-3xl font-extrabold">HoloSquad</span>
                        <p className="ml-3 mt-[-5px] bg-gradient-to-r from-blue-800 to-green-500 bg-clip-text text-transparent font-extrabold">Connect, Share and Inspire</p>
                        </div>
                  </Link>


                  {
                        ctx.user.login === true ? (
                              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base gap-4 justify-center">

                                    <div className='relative'>
                                          <input value={inputValue} onChange={handleNameChange} name='name' type="text" className='border bg-red-100 mr-5 text-center rounded-md w-96 px-16 focus:outline-none py-[6px]' placeholder='Search for a friend or user......' />

                                          <div className='absolute bg-gray-700 rounded-md mt-5 w-96 max-h-40 overflow-y-auto scrollbar-hide  z-10 shadow-lg'>
                                                {
                                                      search.map((ele, index) => {
                                                            return <Link state={ele._id} to={`/friendProfile?name=${ele.name}`} key={index} onClick={handleLinkClick} className='flex py-2 border-b-[1px] cursor-pointer px-10  gap-4'>
                                                                  <img className='w-9 h-9 p-1 rounded-full' src={ele?.profilePic} alt="" />
                                                                  <p className='mt-2 w-fit text-white'>
                                                                        {ele?.name}
                                                                  </p>
                                                                  <p className='flex mt-2 text-yellow-200'>
                                                                        <FaLocationDot className='mt-1' color='red' />
                                                                        {ele?.city}
                                                                  </p>
                                                            </Link>
                                                      })
                                                }
                                          </div>
                                    </div>



                                    <Link to={`/Chats?name=${ctx?.user?.loggedUserDetails?.name}`} className="mr-5 cursor-pointer text-white hover:text-blue-600">
                                          <AiFillMessage size={20} />
                                    </Link>

                                    <Link to={'/Notification'} className="mr-5 cursor-pointer text-white hover:text-blue-600" style={{ position: 'relative' }}>
                                          <div style={{ position: 'absolute', bottom: '10px', left: '19px', color: 'red' }}>{ctx.count}</div>
                                          <IoNotificationsCircle size={27} />
                                    </Link>

                                    {
                                          ctx?.user?.loggedUserDetails?.city ? (<div className='flex justify-center items-center cursor-not-allowed'> <FaLocationDot color='red' />
                                                <p className='mt-1 text-sm ml-2 text-white font-serif'>{ctx?.user?.loggedUserDetails?.city ? ctx.user.loggedUserDetails.city : ""}</p>
                                          </div>) : ("")
                                    }

                              </nav>
                        ) :
                              (
                                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                                          <input type="text" disabled className='border mr-5 cursor-not-allowed text-center placeholder:text-black rounded-md w-96 px-16 focus:outline-none py-[6px] focus:bg-silver' placeholder='Login to Search Anyone......' />
                                    </nav>
                              )
                  }




                  {
                        ctx.user.login === true ?
                              (
                                    <ProfileButton />
                              ) :
                              (
                                    <button onClick={handleRegister} className="inline-flex items-center bg-red-400 border-0 py-1 px-3 focus:outline-none hover:bg-red-200 rounded-md text-base mt-4 md:mt-0">New here !
                                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                          </svg>
                                    </button>
                              )
                  }




            </div>

      )
}

export default Navbar;
