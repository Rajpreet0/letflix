import {PrismaClient} from '@prisma/client';

/*
    Why use this file ?

    In Next.js there is something called Hot-Reloading, where in every
    Code change the Running Developement is updated. When this is done
    everytime a new PrismaClient is created, which is bad. Prisma
    only allows up to 10 Clients then it will throw an error message.

    Now the trick is to firstly create a PrismaClient then store this
    into a global file, because global files are not effected by Hot-Reloading.

    !! Remeber not use this in Production !!

*/

// prismadb is definde in global.d.ts
const client = global.prismadb || new PrismaClient();

if(process.env.NODE_ENV === 'production'){
    global.prismadb = client;
}

export default client;