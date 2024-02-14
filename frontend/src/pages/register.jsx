import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RegisterForm = () => {
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    grade: '',
    reference: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hossam-website.onrender.com/api/user/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include', // Send cookies along with the request
          body: JSON.stringify(formData),
      });
      const data = await response.json();

      setMessage('تم اضافة حسابك بنجاح')
      setTimeout(() => {
        router.push('/')
      }, 1000);
  } catch (error) {
      console.error('Registration failed:', error);
  }
};

  const router = useRouter()

useEffect(() => {
  const isSigned = async () => {
    try {
      const response = await fetch('https://hossam-website.onrender.com/api/check-user', {
        method: 'GET',
        credentials: 'include' // To include cookies in the request
      });
      const data = await response.json();
      if(data.role == 'user' || data.role == 'admin'){
        router.push('/')
      }
    } catch (error) {
      console.error('Error getting role from frontend:', error);
    }
  };

  isSigned();
}, [router]);


  return (
    <div className="max-w-md mx-auto sm:p-4 md:py-6 3xl:py-8 xl:py-8 2xl:py-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" required />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" required />
        </div>
        <div>
          <label htmlFor="grade" className="block mb-1">Grade</label>
          <select id="grade" name="grade" value={formData.grade} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" required>
            <option value="first">اولي ثانوي</option>
            <option value="second">ثانية ثانوي</option>
            <option value="third">ثالثة ثانوي</option>
          </select>
        </div>
        <div>
          <label htmlFor="reference" className="block mb-1">Reference</label>
          <input type="text" id="reference" name="reference" value={formData.reference} onChange={handleChange} className="w-full border-gray-300 rounded-md px-4 py-2" />
        </div>
        <button type="submit" className=" text-white bg-indigo-600 hover:bg-indigo-700 duration-300  px-4 py-2 rounded-md ">Register</button>
      </form>
      <p className='text-xl text-red-600 my-8 text-center '>{message && message}</p>
    </div>
  );
};

export default RegisterForm;
