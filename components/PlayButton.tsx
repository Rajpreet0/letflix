import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { useRouter } from 'next/router';

interface PlayButtonInterface  {
    movieId: string;
};

const PlayButton: React.FC<PlayButtonInterface> = ({movieId}) => {

  const router = useRouter();

  return (
    // If play Button is clicked, then generate the Slug Link for the Movie to play
    <button 
    onClick={() => router.push(`/watch/${movieId}`)}
    className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition'>
        <BsFillPlayFill className='mr-1' size={25}/>
        Play
    </button>
  )
}

export default PlayButton