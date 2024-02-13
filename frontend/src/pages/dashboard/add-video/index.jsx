import  { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useRouter } from 'next/router';

const Index = () => {
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Send form data to backend using fetch or axios
    const formData = {
      title: title,
      link: imageURL,
      content: content
    };

    try {
      const response = await fetch('https://hossam-website.onrender.com/api/video/add-video', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      setMessage('تم اضافة الفيديو بنجاح')
    } catch (err) {
      setMessage('تعذر اضافة')
      console.error('something went wrong')
      
    }

    // Reset form fields
    setTitle('');
    setImageURL('');
    setContent('');
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
        <h1 className='text-5xl text-center my-6'>اضافة فيديو</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-end">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              العنوان
            </label>
            <input
              className="shadow appearance-none border rounded text-end w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="العنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageURL">
              لينك الفيديو
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageURL"
              type="text"
              placeholder="لينك الفيديو"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              المحتوي
            </label>
            <textarea
              className="shadow appearance-none border text-end rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="المحتوي"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              اضافة الفيديو
            </button>
          </div>
          <p>{message && message}</p>
        </form>
      </div>
    </Layout>
  )
}

export default Index
