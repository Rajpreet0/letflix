import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Any Call which isn't a POST Method made to this API should resolve to an Error
    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    try {
        const {email, name, password} = req.body;

        // Check if a User exists by checking the Email
        const exisitingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        // If a User with the Email exists throw Error
        if(exisitingUser) {
            return res.status(422).json({error: 'Email taken'});
        }

        // Hashes the Password from Body which the User typed in Input
        const hashedPassword = await bcrypt.hash(password, 12);


        // Creates a new User in DB
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        // Success User Created
        return res.status(200).json(user);

    } catch (erorr) {   
        return res.status(400).end();
    }
}