import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorite from "@/hooks/useFavorite";
import useMovieList from "@/hooks/useMovieList";
import useInfoModel from "@/hooks/useInfoModel";
import { GetServerSidePropsContext, NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


// This checks if a session exists
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If a session dosen't exist it will then be redirected to auth page
  if (!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}


export default function Home() {

  const {data: movies = []} = useMovieList(); 
  const {data: favorites = []} = useFavorite();

  const {isOpen, closeModal} = useInfoModel();

  return (
    <> 
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Trending now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
