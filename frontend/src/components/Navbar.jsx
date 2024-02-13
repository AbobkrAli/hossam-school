"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const CustomLink = ({ href, title, className = "" }) => {

  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-red-800
              absolute left-0 -bottom-2
              group-hover:w-full transition-width ease duration-300 
              ${router.asPath === href ? 'w-full' : 'w-0'} `}
      >
        &nbsp;
      </span>
    </Link>
  );
};
  
const CustomMobileLink = ({ href, title, className = "", toggle }) => {

  const router = useRouter();

  const handleClick = () =>{
    toggle()
    router.push(href);

  }


  return (
    <button href={href} className={`${className} relative group text-light `} 
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block   bg-red-800
              absolute left-0 -bottom-0.5
              group-hover:w-full transition-width ease duration-300
              ${router.asPath === href ? 'w-full' : 'w-0'} `}
      >
        &nbsp;
      </span>
    </button>
  );
};


const Navbar = () => {
  const [isOpen, seIsOpen] = useState(false)
  const [role, setRole] = useState('unauthorized')

  const router = useRouter();

  const handleLougout = () =>{
    const fetchLogout = async () =>{
      try {
          const response = await fetch('http://localhost:5000/api/signout', {
            method: 'GET',
            credentials: 'include' // To include cookies in the request
          });
          
        } catch (error) {
          console.error('Error getting role from frontend:', error);
        }
      };
      fetchLogout()
      window.location.reload()
    }
  
  // for nav bar
  const handleClick = ()=> {
    seIsOpen(!isOpen)
  }

  useEffect(() => {
    const isSigned = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/check-user', {
          method: 'GET',
          credentials: 'include' // To include cookies in the request
        });
        const data = await response.json();
        setRole(data.role);
        if(data.role !== 'admin' || role == 'user'){
          // router.push('/login')
        }
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };
  
    isSigned();
  }, []);
  




  return (
    <header className='w-full  px-32 lg:px-20 md:px-20 sm:px-16 py-8 font-medium flex items-center justify-between relative text-white bg-blue-950 '>

      {/* البرجر يمعلم */}
      <button className=' flex-col justify-center align-center hidden lg:flex ' onClick={handleClick} >
        <span className={` bg-white block h-0.5 transition-all duration-300 ease-out  w-6 rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-1 ': '-translate-y-0.5'}`}></span>
        <span className={` bg-white block h-0.5 transition-all duration-300 ease-out  w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'} `}></span>
        <span className={` bg-white block h-0.5 transition-all duration-300 ease-out  w-6 rounded-sm -translate-y-0.5 ${isOpen ? '-rotate-45 -translate-y-1 ': 'translate-y-0.5'}`}></span>
      </button>

      {/* mobile header icons */}
      <div className=' items-center justify-center hidden lg:flex'>
            <motion.a href='https://api.whatsapp.com/send?phone=1142308121&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <IoLogoWhatsapp className='text-green-800 text-2xl'/>

            </motion.a>
            <motion.a href='https://www.facebook.com/profile.php?id=100090531433591&mibextid=opq0tG' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaFacebook className='text-blue-800 text-2xl' />
            </motion.a>
            <motion.a href='https://www.instagram.com/hossam_gamal_11?igsh=MWx5c3YzbDg3ajBtcg%3D%3D&utm_source=qr&fbclid=IwAR286Dp90JkvOqs99wh-nw43JYbzjAoaS8KDIhDlz6fXNG5h_h0Jj7Vjg3k' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaInstagram className='text-blue-800 text-2xl' />
            </motion.a>
            
           
      </div>

      {/* desktop nav links */}
      <div className='w-full flex justify-between items-center lg:hidden'>
        

        {/* desktop and mobile header icons */}
        <nav className='flex items-center justify-center flex-wrap'>
      
            <motion.a href='https://api.whatsapp.com/send?phone=1142308121&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <IoLogoWhatsapp className='text-green-800 text-2xl' />
            </motion.a>
            
            <motion.a href='https://www.instagram.com/hossam_gamal_11?igsh=MWx5c3YzbDg3ajBtcg%3D%3D&utm_source=qr&fbclid=IwAR286Dp90JkvOqs99wh-nw43JYbzjAoaS8KDIhDlz6fXNG5h_h0Jj7Vjg3k' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaInstagram  className='text-red-600 text-2xl' />
            </motion.a>
            <motion.a href='https://www.facebook.com/profile.php?id=100090531433591&mibextid=opq0tG' target='_blank'
                whileHover={{y:-2}}
                whileTap={{scale:0.9}}
                className='w-6 mr-3'
            >
                <FaFacebook className='text-blue-800 text-2xl' />
            </motion.a>
            
        </nav>
        <div>
          {role == 'user' || role == 'admin' ? (
            <nav>
              <CustomLink href= "/" title="الامتحانات" className='mx-4 text-xl' />
              <CustomLink href= "/videos" title="الفيديوهات" className='mx-4 text-xl'/>
              <button onClick={handleLougout} className='mx-4 text-xl'> تسجيل الخروج</button>
          </nav>
          )
          : (
            <div>
              <Link href='login' className='mx-4'>
                <button className='py-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-800'>sign in</button>
              </Link>
              <Link href='register'>
                <button className='py-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-800'>register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* mbile nav container */}
      <AnimatePresence>
      {
        isOpen &&(
          
            <motion.div className='min-w-[70%]  z-30 flex-col fixed flex justify-between items-center  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 rounded-lg backdrop-blur-md py-32'
              initial={{
                opacity:0,
                y:-50,
                x: "-50%"
              }}
              animate={{
                opacity:1,
                y:"-50%",
                x: "-50%"
              }}
              exit={{
                opacity: 0,
                y: -50,
                x: "-50%",
                transition: {
                  duration: 0.1
                }
              }}
            >
               {role == 'user' || role == 'admin' ? (
            <nav className='flex  items-center flex-col justify-center'>
                 <CustomMobileLink href= "/" title="الامتحانات" className='my-2 text-xl'  toggle={handleClick} />
                  <CustomMobileLink href= "/videos" title="الفيديوهات" className='my-2 text-xl' toggle={handleClick} />
                  <button onClick={handleLougout} className='my-2 text-xl'> تسجيل الخروج</button>
            </nav>
            )
            : (
              <div>
                <Link href='login' className='mx-4'>
                  <button className='py-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-800'>sign in</button>
                </Link>
                <Link href='register'>
                  <button className='py-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-800'>register</button>
                </Link>
              </div>
            )}
              
              
            </motion.div>
        )
      }
      </AnimatePresence>
      
      
    </header>
  )
}

export default Navbar
