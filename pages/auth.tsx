// Components
import Input from "@/components/Input";
// React Hooks
import { useCallback, useState } from "react";
// React Icons
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
// API / Backend
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
  
    // If a session exists, redirect to home page
    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  
    return {
      props: {},
    };
  }

const Auth = () => {

    // State variables for managing from data
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    /* ---- Variant Toggle Method to switch between Login and SignUp ----*/
    
    // At default it should open Login Screen
    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        // If currentVariant is equal to Login it should toggel to register otherwise it should toggle to login
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    // Callback Function which calls nextauth api to login a user
    const login = useCallback(async () => {
        try{
            // Sign in using credentials (email and password)
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/profiles');
        }catch (error) {
            console.log(error);
        }
    }, [email, password]);

    // Callback Function which put out a POST request to the register API usign Axios
    const register = useCallback(async ()  => {
        try {
            // Make a POST request to the register API endpoint
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            
            login(); // After successfull register it should also login using login function
        }catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);


    return(
        // bg-[] => Custom Background inside putting a url('relative_path_to_image')
        <div className="relative h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12"></img>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {/* Using Ternity Operator it is possible to show different UI compoents when on Login or Register  */}
                            {variant === 'login' ? 'Sign In' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {/* Render input field for username if variant is register */}
                            {variant === 'register' && (
                                <Input 
                                    label="Username" 
                                    onChange={(e: any) => {setName(e.target.value)}} 
                                    id="name" 
                                    value={name} 
                                />
                            )}
                            <Input 
                                label="Email" 
                                onChange={(e: any) => {setEmail(e.target.value)}} 
                                id="email" 
                                type="email" 
                                value={email} 
                            />
                            <Input 
                                label="Password" 
                                onChange={(e: any) => {setPassword(e.target.value)}} 
                                id="password" 
                                type="password" 
                                value={password} 
                            />
                        </div>
                         {/* Button for either login or register */}
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div 
                                onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                            </div>
                            <div
                                onClick={() => signIn('github', {callbackUrl: '/profiles'})} 
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix ?' : 'Already have an account?'}
                            <span 
                            onClick={toggleVariant}
                            className="text-white ml-1 hover:underline cursor-pointer">
                                 {variant === 'login' ? 'Create an Account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;