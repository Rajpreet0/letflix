import React, {useCallback, useMemo} from 'react'
import axios from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorite from '@/hooks/useFavorite'

import {AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai'

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {

  const {mutate: mutateFavorites} = useFavorite();
  const {data: currentUser, mutate} = useCurrentUser();

  // Memoized value to check if the movie is already in user's favorites
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
  
    return list.includes(movieId); // Checking if the movie ID is included in the favorite list
  }, [currentUser, movieId]);

  // Function to toggle favorite button
  const toggleFavorites = useCallback(async () => {
    let response;

    // If the movie is already in favorites, remove it; otherwise, add it
    if (isFavorite) {
        response = await axios.delete('/api/favorite', {data: {movieId}});
    } else {
        response = await axios.post('/api/favorite', {movieId});
    }

    // Updated list of favorite IDs
    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Update current user data with new favorite id
    mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
    });

    // Trigger mutation to update favorites
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  // Icon to display icon based on favorite status
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div onClick={toggleFavorites} 
    className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center 
    items-center transition hover:border-neutral-300 '> 
        <Icon className='text-white' size={20}/>
    </div>
  )
}

export default FavoriteButton