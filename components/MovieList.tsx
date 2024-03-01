import React from 'react'
import {isEmpty} from 'lodash'; // Libary to take the hassle out of working with arryas etc.
import MovieCard from './MovieCard';

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {

  // If there is no Data available just return nothing
  if(isEmpty(data)){
    return null;
  }

  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
        <div>
            <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
                {title} {/* Get the Title of the Data */}
            </p>
            <div className='grid grid-cols-4 gap-2'>
                {/* Generate for each Movie Load from DB a Moviecard & provide it with the Data as a Parameter */}
                {data.map((movie) => (
                    <MovieCard key={movie.id} data={movie}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList