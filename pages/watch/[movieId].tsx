import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useRouter } from 'next/router'
import useMovie from '@/hooks/useMovie'

const Watch = () => {
  
  const router = useRouter();

  // Get movieId from query params
  const {movieId} = router.query; 

  // Fetch movie data using custom hook
  // Fix Typescript therefor movieId as String
  const { data } = useMovie(movieId as string);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
        <AiOutlineArrowLeft onClick={() => router.push('/')} className='text-white cursor-pointer' size={40}/>
        <p className='text-white text-1xl md:text-3xl font-bold'>
          <span className='font-light'>Watching</span>: {data?.title} {/* Display movie title */}
        </p>
      </nav>
      {/* Video player */}
      <video className='h-full w-full' autoPlay controls src={data?.videoUrl}></video> {/* Display movie video */}
    </div>
  )
}

export default Watch