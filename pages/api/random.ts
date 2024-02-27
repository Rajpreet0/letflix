import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET'){
        res.status(405).end();
    }

    try {
        await serverAuth(req, res);

        // Get Count of how many Movies there are in DB
        const movieCount = await prismadb.movie.count();
        // Calculate a Random Index Number from MovieCount
        const randomindex = Math.floor(Math.random() * movieCount);

        // Get all Movies from DB but only take a random one 
        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomindex
        });

        // Random Movies returns an Array with only one Value so take the first one
        return res.status(200).json(randomMovies[0]);

    }catch (error) {
        console.log(error);
        return res.status(400).end();
    } 
}