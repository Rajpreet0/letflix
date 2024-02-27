import  {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';

import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Function to check wheter a user is logged in or not
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    // session holds the jwt Token
    const session = await getServerSession(req, res, authOptions);

    // If there is no session or there is no user or there is no email
    if(!session?.user?.email){
        throw new Error("Not signed in");
    }

    // Find currentUser from currently running session
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    // If no User is found e.g deleted then an Error should be thrown
    if(!currentUser) {
        throw new Error("Not signed in");
    }

    return {currentUser};
};

export default serverAuth;