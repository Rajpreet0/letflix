import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // If the Method is not a GET Function then return a error
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try{
        const {currentUser} = await serverAuth(req, res);

        // Fetch favorited movies from the database
        const favoritedMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds, // Filter by favorite movie IDs of the current user
                }
            }
        });

        return res.status(200).json(favoritedMovies);
    }catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}