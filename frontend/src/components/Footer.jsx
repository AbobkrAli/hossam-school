import  { useEffect, useState } from 'react'
import Layout from './Layout'
import { Footer } from 'flowbite-react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Foooter = () => {
  const [role, setRole] = useState('user')


  const router = useRouter()

  useEffect(() => {
    const isSigned = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/check-user', {
          method: 'GET',
          credentials: 'include' // To include cookies in the request
        });
        const data = await response.json();
        if(data.role == 'admin' || data.role == 'user'){
          setRole(data.role)
        }else{
          router.push('/login')
        }
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };

    isSigned();
  }, []);






  return (
    <div className='w-full border-t-2 border-solid border-dark font-medium
    text-lg sm:text-base  '>
      <Layout classname='py-8 flex items-center justify-between  lg:py-6  text-white bg-slate-900'>
        
        <div className='text-xl'>
          <Footer.Title title="الصفحات" className='text-2xl ' />
          {role == 'user' || role == 'admin' ? (
          <Footer.LinkGroup col>
            
                <Footer.Link href="/" className='hover:text-red-600 duration-300 text-xl'>الامتحانات</Footer.Link>
                <Footer.Link href="/videos" className='hover:text-red-600 duration-300 text-xl'>الفيديوهات</Footer.Link>
          </Footer.LinkGroup>
            
            )
            : (
              <Footer.LinkGroup col>
              <div>
                <Link href='login' className='mx-4'>
                  <button className='py-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-800'>sign in</button>
                </Link>
                <Link href='register'>
                  <button className='py-2 px-4 bg-red-500 text-white rounded duration-300 hover:bg-red-800'>register</button>
                </Link>
              </div>
          </Footer.LinkGroup>
            )}
        </div>
        <div >
          <Footer.Title title=" تواصل مع مستر حسام" className='text-xl' />
          <Footer.LinkGroup col className='flex justify-center items-center'>
            <Footer.Link href="https://api.whatsapp.com/send?phone=1142308121&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85" ><IoLogoWhatsapp className='text-gray-800 hover:text-green-800 duration-300 text-3xl'/> </Footer.Link>
            <Footer.Link href="https://www.facebook.com/profile.php?id=100090531433591&mibextid=opq0tG"><FaFacebook className='text-gray-800 text-3xl hover:text-blue-900 duration-300' /></Footer.Link>
            <Footer.Link href="https://www.instagram.com/hossam_gamal_11?igsh=MWx5c3YzbDg3ajBtcg%3D%3D&utm_source=qr&fbclid=IwAR286Dp90JkvOqs99wh-nw43JYbzjAoaS8KDIhDlz6fXNG5h_h0Jj7Vjg3k"><FaInstagram className='text-gray-800 text-3xl hover:text-red-700 duration-300' /></Footer.Link>
          </Footer.LinkGroup>
        </div>
        
      </Layout>
      <div className='w-full text-center text-white bg-slate-900 '>
        <span>{new Date().getFullYear()} &copy; All right Reserved. </span>
        <p className='  italic text-red-600 text-center'>made by abobkr ali</p>
      </div>
    </div>
  )
}

export default Foooter