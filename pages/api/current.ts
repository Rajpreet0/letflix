import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

// API Route to get the Currently logged in User
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Limit the Function to only GET Methods
    if(req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        return res.status(200).json(currentUser);
    }catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}