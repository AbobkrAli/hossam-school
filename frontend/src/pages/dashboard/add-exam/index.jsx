
import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useRouter } from 'next/router';

const AddExamForm = () => {
        const [message, setMessage] = useState('')
        const [examData, setExamData] = useState({
          name: '',
          subject: '',
          content: '',
          grade: '',
          questions: [],
        });
        const router = useRouter()
      
        const handleInputChange = (field, value) => {
          setExamData((prevData) => ({
            ...prevData,
            [field]: value,
          }));
        };
      
        const handleQuestionChange = (index, value) => {
          setExamData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[index].question = value;
            return {
              ...prevData,
              questions: updatedQuestions,
            };
          });
        };
      
        const handleAnswerChange = (questionIndex, answerIndex, value) => {
          setExamData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[questionIndex].answers[answerIndex] = value;
            return {
              ...prevData,
              questions: updatedQuestions,
            };
          });
        };
      
        const handleCorrectAnswerChange = (questionIndex, value) => {
          setExamData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[questionIndex].realAnswer = value;
            return {
              ...prevData,
              questions: updatedQuestions,
            };
          });
        };
      
        const handleAddQuestion = () => {
          setExamData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, { question: '', answers: ['', '', '', ''], correctAnswer: '' }],
          }));
        };
      
        const handleRemoveQuestion = (index) => {
          setExamData((prevData) => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions.splice(index, 1);
            return {
              ...prevData,
              questions: updatedQuestions,
            };
          });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const response = await fetch('https://hossam-website.onrender.com/api/exam/add-exam', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              credentials: 'include',
              body: JSON.stringify(examData)
            });
        
            if (response.ok) {
              setMessage('تم اضافة الامتحان بنجاح');
            } else {
              setMessage('تعذر اضافة الامتحان');
              console.error('Failed to add exam:', response.statusText);
            }
          } catch (err) {
            setMessage('تعذر اضافة الامتحان');
            console.error('Something went wrong with adding the exam in frontend:', err);
          }
        };
        
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
                router.push('/login')
              }
            } catch (error) {
              console.error('Error getting role from frontend:', error);
            }
          };
      
          isSigned();
        }, [router]);

        return (
            <Layout>
            <div className="max-w-lg mx-auto">
                <h1 className='text-5xl text-center my-6'>اضافة امتحان</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-end">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    الاسم
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={examData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                      كلام حول الامتحان
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="content"
                    type="text"
                    value={examData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
                    اختر سنة كام
                    </label>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="grade"
                    value={examData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    required
                    >
                    <option value="أولي ثانوي">أولي ثانوي</option>
                    <option value="ثانية ثانوي">ثانية ثانوي</option>
                    <option value="ثالثة ثانوي">ثالثة ثانوي</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                      المادة
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="subject"
                    type="text"
                    placeholder="Enter subject"
                    value={examData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                    />
                </div>
                <hr className="my-6" />

                {examData.questions.map((question, index) => (
                    <div key={index} className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question-${index}`}>
                        السؤال {index + 1}
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={`question-${index}`}
                        type="text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        required
                    />

                    {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`answer-${index}-${answerIndex}`}>
                            الاجابة رقم {answerIndex + 1}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={`answer-${index}-${answerIndex}`}
                            type="text"
                            value={answer}
                            onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                            required
                        />
                        </div>
                    ))}

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`correct-answer-${index}`}>
                        الاجابة الصحيحة
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={`realAnswer`}
                            type="text"
                            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end mt-2">
                        <button
                        type="button"
                        onClick={() => handleRemoveQuestion(index)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                        >
                        ازالة السؤال
                        </button>
                    </div>
                    </div>
                ))}

                <div className="flex justify-end">
                    <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    اضافة سؤال اخر
                    </button>
                </div>

                <div className="flex items-center justify-end mt-6">
                    <button
                    className="hover:bg-red-500 duration-300 bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                    اضف الامتحان 
                    </button>
                </div>
                </form>
                <p className='text-xl py-4 text-center text-red-600'> {message && message} </p>
            </div>
            </Layout>
        );
};

export default AddExamForm;
