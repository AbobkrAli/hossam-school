import { Project } from "@/pages/videos"
import Layout from "../Layout"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const [message, setMessage] = useState();
  const [videos, setVideos] = useState([]);
  
  const router = useRouter()

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
  
  
  useEffect(() => {
    const isSigned = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/check-user', {
          method: 'GET',
          credentials: 'include' // To include cookies in the request
        });
        const data = await response.json();
        if(data.role == 'admin'){
          // done
        }else if(data.role == 'user'){
          router.push('/')
        }else{
          router.push('/login')
        }
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };

    isSigned();
  }, []);


  const handleDelete = async (id) => {
    const deleteVideo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/video/delete-video', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        if (response.ok) {
          setMessage('تم حذف الفيديو بنجاح')
        } else {
          console.error('Failed to delete video:', response.statusText);
          setMessage('حدث خطأ اثناء حذف الفيديو')
        }
      } catch (err) {
        console.error('Error deleting the video:', err.message);
        setMessage('حدث خطأ اثناء حذف الفيديو')
      }
    }
    deleteVideo()
  };
  

  return (
    <Layout>
        <div className="w-full flex flex-wrap bg-white  ">
        
        {videos.map((v)=>(
          <div key={v._id} className="flex justify-center h-full w-full lg:w-full  shadow-2xl 3xl:w-1/2 2xl:w-1/2 xl:w-1/2 mb-8 ">
            <div className="flex justify-center items-center p-12 w-1/4 lg:w-1/12  ">
              <p
                onClick={() => handleDelete(v._id)}
                className="text-red-800 text-center w-full cursor-pointer"
              >
                مسح الفيديو
              </p>
            </div>
              <div className="p-8 w-full">
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
          
      </div>
      

    </Layout>
  )
}

export default Index
