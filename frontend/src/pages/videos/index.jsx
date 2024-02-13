
import AnimatedText from '@/components/AnimatedText'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Head from 'next/head'
export const Project = ({ title, content, videoLink ,link, buttonContent }) => {
  

  

  return (
      <>
        <Head>
          <title>اسال الماذون | الصوتيات والمرأيات</title>
          <meta name='description' content="مقالات الماذون الشرعي " />
          <meta name='keywords' content='زواج , طلاق, كتب كتاب , تصادق , رجعة , زواج اجانب , سفارة , وزارة العدل , قنصلية , الخارجية , العبور , الشروق , بدر , مدينتي , الرحاب , القاهرة' />
          <meta name='author' content='محمد البحراوي' />
        </Head>
        <motion.article
          className='w-[100%] flex  border-projects items-center  justify-center rounded-2xl border-solid border-dark bg-light p-6 relative shadow-2xl flex-col'
          initial={{
            opacity: 0,
            y: 50
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href={link} target='_blank' className='w-full cursor-pointer overlfow-hidden rounded-lg'>
            <iframe className='w-full h-[250px] sm:h-[150px] rounded' src={videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer;  sameorigin;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </Link>
          <div className='w-full flex flex-col items-start justify-between mt-4 '>
            <h2 className='my-2 w-full  text-3xl font-bold text-end sm:text-xl '>{title}</h2>
            <div className='w-full'>
              <p className='text-primary text-end font-medium text-xl sm:text-base'>{content}</p>
            </div>
            <div className=' flex items-center justify-center w-full align-center mt-4'>
              {buttonContent !== 'شوف الفيديو' && (
                <Link href={`/articles/${link}`} target='_blank' className='ml-4 text-lg font-semibold underline hover:text-red-700  duration-300'>
                  {buttonContent}
                </Link>
              )}
              
            </div>
          </div>
        </motion.article>
      </>
    
  );
};


const Projects = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

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
          // done
        }else{
          router.push('/login')
        }
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };

    isSigned();
  }, []);
  
  
  
  useEffect(()=>{
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/video/get-videos', {
              method: 'GET',
              credentials: 'include', // Send cookies along with the request
          });
          const data = await response.json();
          setVideos(data.data)
      } catch (error) {
          console.error('failed to fetch exams:', error);
      }
    }
    fetchVideos()
  },[])
  
  


  return (
    <>
      <Head>
        <title>حسام | الفيديوهات</title>        
      </Head>
      <main>
        <Layout className='pt-16 mb-16 flex flex-col items-center justify-center'>
  
          <AnimatedText text="الفيديوهات" className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />
          {/* <SearchBar /> */}
          <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
            {videos.map((v)=>(
              <div className="col-span-6 sm:col-span-12 text-end " key={v._id}>
                  <div >
                    <Project
                      key={v._id}
                      title={v.title}
                      videoLink={v.link}
                      content={v.content}
                      buttonContent="شوف الفيديو"
                      link="#"
                    />
                  </div>
              </div>
            ))}    
            <p className='text-xl text-white my-6'>{ error ?error : '' }</p>
          </div>
          
        </Layout>
      </main>
    </>
  );
};

export default Projects;
