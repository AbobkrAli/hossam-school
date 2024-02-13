import Layout from '../Layout'
import  { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const index = () => {
  const [exams, setExams] = useState([])
  const [message, setMessage] = useState('')
  const router = useRouter()
  

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


  useEffect(()=>{
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/exam/get-exams', {
              method: 'GET',
              credentials: 'include', // Send cookies along with the request
          });
          const data = await response.json();
          setExams(data.data)
      } catch (error) {
          console.error('failed to fetch exams:', error);
      }
    }
    fetchExams()
  },[])

  
  const handleClick = async (id) => {
    
      try {
        const response = await fetch('http://localhost:5000/api/exam/delete-exam', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        if (response.ok) {
          setMessage('تم حذف الامتحان بنجاح')
        } else {
          console.error('Failed to delete video:', response.statusText);
          setMessage('حدث خطأ اثناء حذف الامتحان')
        }
      } catch (err) {
        console.error('Error deleting the video:', err.message);
        setMessage('حدث خطأ اثناء حذف الامتحان')
      }
    
    
  };


  return (
    <Layout>
      <div className="container min-h-screen m-auto mt-4 ">
       
      {exams.map((exam) => (
        <div key={exam._id} className="w-full bg-blue-950 rounded shadow-lg p-6 text-end mb-4">
          <h1 className="text-2xl font-bold mb-4 text-white md:text-lg sm:text-md">{exam.name}</h1>
          <p className="text-gray-400 text-lg mb-4 sm:text-base">{exam.content}</p>
          <div className="flex justify-between text-gray-400">
            <p className="text-lg sm:text-base">{exam.subject}</p>
            <p className="text-lg sm:text-base">{exam.grade}</p>
          </div>
          <div className='w-full text-black rounded hover:text-red-900 duration-200 flex justify-center items-center'>
            <p onClick={() => handleClick(exam._id)} className='p-4 sm:p-2 bg-white rounded duration-300 text-xl sm:text-lg mt-8 cursor-pointer'>حذف الامتحان</p>
          </div>
          <p className='text-lg text-red-600 text-center py-4'>{message && message}</p>
        </div>
      ))}

        
      </div>
      
    </Layout>
  )
}

export default index
