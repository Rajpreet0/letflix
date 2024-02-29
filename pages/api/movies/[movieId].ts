import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the Method is not a GET Function if not then return Error
    if(req.method !== 'GET') {
        return res.status(405).end();
    }

    try{

        await serverAuth(req, res);

        // Extract the movieId from the query parameters
        const {movieId} = req.query;

        // Check if movieId is not a string if then throw an Error
        if(typeof movieId !== 'string') {
            throw new Error('Invalid Id');
        }

        // Check if movieId is missing if then throw an Error
        if (!movieId){
            throw new Error('Missing Id');
        }

        // Fetch the movie from the database using movieId
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId // Filter by movieId
            }
        });

        return res.status(200).json(movie);
    }catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}