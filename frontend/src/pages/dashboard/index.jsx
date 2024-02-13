'use client';
import { useRouter } from 'next/router';
import Layout from './Layout';
import { useEffect, useState } from 'react';
import ExamAdminCard from '@/components/ExamsِAdminCard';

const Dashboard = () => {

  const [exams, setExams] = useState([])
  const router = useRouter()
  

  useEffect(() => {
    const isSigned = async () => {
      try {
        const response = await fetch('https://hossam-website.onrender.com/api/check-user', {
          method: 'GET',
          credentials: 'include' // To include cookies in the request
        });
        const data = await response.json();
        if(data.role == 'admin'){
          // done
        }else if(data.role == 'user'){
          router.push('/')
        }else{
          router.push('login')
        }
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };

    isSigned();
  }, [router]);


  useEffect(()=>{
    const fetchExams = async () => {
      try {
        const response = await fetch('https://hossam-website.onrender.com/api/exam/get-exams', {
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



  return (
    <Layout>
      {/* { */}
        {/* // data.map((q)=>( */}
      <div className='block bg-gray-400 p-12 w-100%' >
        {exams.map((exam) => (
          <div className='m-6' key={exam._id}>
            <ExamAdminCard  buttonContent="نتيجة الامتحان" examName={exam.name} examGrade={exam.grade} content={exam.content} examSubject={exam.subject} examLink={exam._id} />
          </div>  
        ))}
        
      </div>
        {/* )) */}
      {/* } */}
    </Layout>
  )
}

export default Dashboard
