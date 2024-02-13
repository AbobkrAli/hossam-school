import Layout from '@/components/Layout'
import Head from 'next/head'
import ExamCard from '@/components/ExamCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
export default function Home() {
  const [exams, setExams] = useState([])
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


  return (
    <>
      <Head>
        <title>حسام | الامتحانات</title>        
      </Head>
      {/* <TransitionEffect /> */}
      <main className='flex items-center text-dark w-full min-h-screen flex-col'>
        <Layout classname='pt-0 md:pt-16 sm:pt-8'>
          <div className='grid grid-cols-1 w-full mt-8'>
              {exams?.map((exam)=>(
                <div key={exam._id} className='my-8'>
                  <ExamCard key={exam._id} examName={exam.name} examGrade={exam.grade} examContent={exam.content} examSubject={exam.subject} link={exam._id}  />
                </div>
              ))}
          </div>
        
        </Layout>
      </main>
    </>
  )
}
