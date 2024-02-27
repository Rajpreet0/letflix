import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try{
        // The Case when a User adds a Movie to it's favorites
        if(req.method == 'POST'){
            const {currentUser} = await serverAuth(req, res);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if(!existingMovie) {
                throw new Error("Invalid ID");
            }

            // Update User Schema to add Favorite Movie (ID)
            const user = await prismadb.user.update({
                where: { // The Current User Email should be searched
                    email: currentUser.email || '',
                },
                // Data that should be updated
                data: {
                    // Add into FavoriteIds the MovieId
                    favoriteIds: {
                        push: movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        // The Case if the User delets a movie from favorite List
        if(req.method == 'DELETE'){
            const {currentUser} = await serverAuth(req, res);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if(!existingMovie) {
                throw new Error("Invalid ID");
            }

            // Update the List from current User but without the MovieId so (deletion)
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: { 
                    email: currentUser.email || '',
                },
                data: {
                    // The whole List is updated not a single Value
                    favoriteIds: updatedFavoriteIds 
                }
            });

            return res.status(200).json(updatedUser);
        }

        return res.status(405).end();
    }catch (error){
        console.log(error);
        return res.status(400).end();
    }
}