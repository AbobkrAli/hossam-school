import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const handleClick = async () => {
    const fetchLogout = async () => {
      try {
        const response = await fetch('https://hossam-website.onrender.com/api/signout', {
          method: 'GET',
          credentials: 'include' // To include cookies in the request
        });
      } catch (error) {
        console.error('Error getting role from frontend:', error);
      }
    };

    fetchLogout();
    window.location.reload();
  };

  return (
    <div className='flex '>
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className='h-[100vh]'>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className='text-xl flex flex-col text-center text-white'>
              <Link href="/dashboard" className='mt-6'>الامتحانات</Link>
              <Link href="/dashboard/delete-exam" className='mt-6'> حذف امتحان</Link>
              <Link href="/dashboard/delete-video" className='mt-6'>مسح فيديو</Link>
              <Link href="/dashboard/add-exam" className='mt-6'>اضافة امتحان</Link>
              <Link href="/dashboard/add-video" className='my-6'>اضافة فيديو</Link>
              <p className='cursor-pointer' onClick={handleClick}>تسجيل الخروج</p>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <main style={{flex:'1'}} className="w-full bg-white" >{children}</main>
    </div>
  );
};

export default Layout;
