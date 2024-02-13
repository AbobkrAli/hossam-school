
import { useRouter } from 'next/router';
import  { useState, useEffect } from 'react';


const Index = () => {
  const [userScores, setUserScores] = useState([]);

  const router = useRouter()
  const {examResult} = router.query
  useEffect(() => {
    const fetchUserScores = async () => {
      try {
        const response = await fetch(`https://hossam-website.onrender.com/api/exam/${examResult}/get-score`);
        if (!response.ok) {
          throw new Error('Failed to fetch user scores');
        }
        const data = await response.json();
        setUserScores(data);
      } catch (error) {
        console.error('Failed to fetch user scores:', error);
      }
    };

    fetchUserScores();
  }, [examResult]);

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
    <div className="overflow-x-auto min-h-screen">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Number</th>
            <th className="px-4 py-2">Grade</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((userScore, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{userScore.username}</td>
              <td className="border px-4 py-2">{userScore.number}</td>
              <td className="border px-4 py-2">{userScore.grade}</td>
              <td className="border px-4 py-2">{userScore.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
