import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Index = () => {
    const [questionsData, setQuestionsData] = useState([])
  const [userAnswers, setUserAnswers] = useState([]);
  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };  
  const [message, setMessage] = useState('')

  const router = useRouter()
  const { exam } = router.query;
  const [userId, setUserId]  = useState('')
  useEffect(() => {
    const isSigned = async () => {
      try {
        const response = await fetch('https://hossam-website.onrender.com/api/check-user', {
          method: 'GET',
          credentials: 'include' // To include cookies in the request
        });
        const data = await response.json();
        if(data.role == 'admin'){
          setUserId(data.userId)
        }else if(data.role == 'user'){
          setUserId(data.userId)
        }else{
          router.push('login')
        }
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };

    isSigned();
  }, [router]);




  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`https://hossam-website.onrender.com/api/exam/${exam}/get-exam`, {
          method: 'GET',
          credentials: 'include', // Send cookies along with the request
        });
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        setQuestionsData(data.data.questions);
      } catch (error) {
        console.error('Failed to fetch exam:', error);
      }
    };

    fetchExams();
  }, [exam]);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const calcResult = () => {
      let result = 0;
      for (let i = 0; i < questionsData.length; i++) {
        if (questionsData[i].realAnswer === userAnswers[i]) {
          result++;
        }
      }
      return result;
    };
  
    const score = calcResult();
    try {
      const response = await fetch('http://localhost:5000/api/exam/addUserScoreToExam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exam, userId, score }),
      });
      
      setMessage('تم اضافة النتيجة , الرجاء عدم ارسالها مره اخري');
    } catch (error) {
      setMessage('فشل ارسال النتيجة ');
      console.error(error);
    }
  };
  
  return (
    <div className="container mx-auto mt-8 min-h-screen">
      <h1 className="text-3xl font-bold m-4 text-end">امتحان</h1>
      <form onSubmit={handleSubmit} className='p-12 text-end'>
        {questionsData?.map((question, index) => (
          <div key={question._id} className="my-6  border p-6">
            <h2 className="text-xl font-semibold mb-8">{`السؤال - ${index} :    ${question.question}`}</h2>
            <ul className='flex justify-around flex-col'>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                      value={answer}
                      checked={userAnswers[index] === answer}
                      onChange={() => handleAnswerChange(index, answer)}
                    />
                    <span className="ml-2">{answer}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Answers</button>
      </form>
      <p className='text-xl text-center text-red-700'>{message && message}</p>
    </div>
  );
  
}

export default Index
