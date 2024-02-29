import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the Method is not a GET Function if not then return Error
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try{
        await serverAuth(req,res);

        // Fetch all movies from the database
        const movies = await prismadb.movie.findMany();

        return res.status(200).json(movies);
    }catch (error) {
        console.log(error);
    }
}