import Link from 'next/link'

const DeleteExamCard = ({examName, examGrade,content, examSubject,examLink,handleClickFn }) => {
  return (
    <div className="w-full bg-blue-950 rounded shadow-lg p-6 text-end">
        <h1 className=" text-2xl font-bold mb-4 text-white md:text-lg sm:text-md">{examName}</h1>
        <p className=" text-gray-400 text-lg mb-4 sm:text-base">{content}</p>
        <div className="flex justify-between text-gray-400 ">
            <p className="text-lg sm:text-base">{examSubject}</p>
            <p className="text-lg sm:text-base">{examGrade}</p>
        </div>
        <div className='w-full text-black rouded hover:text-red-900 duration-200 flex justify-center items-center '>
            <p   onClick={handleClickFn} className='p-4 sm:p-2 bg-white rounded  duration-300 text-xl sm:text-lg mt-8 cursor-pointer ' > حذف الامتحان </p>
        </div>
    </div>

  )
}

export default DeleteExamCard
