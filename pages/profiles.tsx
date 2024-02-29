import useCurrentUser from "@/hooks/useCurrentUser";
import {GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { useCallback } from "react";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
  
    // If a session dosen't exist it will then be redirected to auth page
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false
        }
      }
    }
  
    return {
      props: {} // Return Data Type needed but nothing to return therefore empty Props Object
    }
  }

const Profiles = () => {
    const router = useRouter();
    // Fetch current user data using Current User Hook
    const {data: user} = useCurrentUser();
  
    // Function to select a profile and navigate to home page
    const selectProfile = useCallback(() => {
      router.push("/");
    }, [router]); // Depend on router object to avoid recreating the function on each render

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching ?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={selectProfile}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent
                             group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="/images/default-blue.png" alt='profile'></img>
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                {user?.name} {/* Display user's name */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;


