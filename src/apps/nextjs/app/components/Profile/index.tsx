'use client';

import React, {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {fetchWithAuth} from "@/app/api/utils/api";
import {FaCircleUser} from "react-icons/fa6";
import {useRouter} from 'next/navigation';
import {useBalance} from "@/app/context/BalanceContext";
import {Button} from "@/app/components/Button/Page";

export const Profile = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const {data: session} = useSession();
    const router = useRouter();
    const {setBalance} = useBalance();

    const getProfile = async () => {

        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const url = "/api/users/profile"
            const data = await fetchWithAuth(url, "GET", session.tokens?.token)
            if (typeof (data.balance) === 'number' && !isNaN(data.balance)) {
                setBalance(data.balance);
            }
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };

    const handleLogin = () => {
        router.push('/login');
    }

    const handleRegister = () => {
        router.push('/register-user');
    };

    const handleForgotPassword = () => {
        router.push('/forgot-password')
    }
    return (<div className="mr-2">
        <ul className="flex items-center justify-center gap-3">
            {session?.tokens?.token &&
                <li className="flex justify-center items-center">
                    <FaCircleUser className="xl:text-2xl"/>
                    {session?.user?.firstName && <div className="ml-2">Hello {session?.user?.firstName}</div>}
                </li>
            }
            {session?.tokens?.token &&
                <Button  onClick={getProfile}>
                    <span className="text-white">Deposit</span>
                </Button>
            }
            <li>
                <Button onClick={() => session ? signOut() : handleLogin()}>
                    <span className="text-white">{session ? 'Sign Out' : 'Login'}</span>
                </Button>
            </li>
            {!session?.tokens?.token &&
                <li>
                    <Button onClick={handleRegister}>
                        <span className="text-white">Register</span>
                    </Button>
                </li>
            }

        </ul>
    </div>)
}

// {/*<div className="flex pr-4"*/}
// {/*     role="button"*/}
// {/*     aria-haspopup="true"*/}
// {/*     aria-expanded={isMenuVisible}*/}
// {/*     onMouseEnter={() => setIsMenuVisible(true)}*/}
// {/*     onMouseLeave={() => setIsMenuVisible(false)}*/}
// {/*     onFocus={() => setIsMenuVisible(true)}*/}
// {/*     onBlur={() => setIsMenuVisible(false)}*/}
// {/*     tabIndex={0}*/}
// {/*>*/}
//
// {/*    {isMenuVisible && (*/}
// {/*        <div*/}
// {/*            className="absolute right-1.5 mt-2 w-52 bg-primary border border-gray-600 shadow-lg rounded-lg">*/}
// {/*            <ul>*/}
// {/*                /!*old signinbutton*!/*/}
//
// {/*                /!*<li>*!/*/}
// {/*                /!*    <button*!/*/}
// {/*                /!*        onClick={() => session ? signOut() : signIn("Login")}*!/*/}
// {/*                /!*        className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"*!/*/}
// {/*                /!*    >*!/*/}
// {/*                /!*        <FaSignInAlt className="mr-2 text-white"/>*!/*/}
// {/*                /!*        <span className="text-white">{session ? 'Sign Out' : 'Sign In'}</span>*!/*/}
// {/*                /!*    </button>*!/*/}
// {/*                /!*</li>*!/*/}
// {/*                <li>*/}
// {/*                    <button*/}
// {/*                        onClick={() => session ? signOut() : handleLogin()}*/}
// {/*                        className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"*/}
// {/*                    >*/}
// {/*                        <FaSignInAlt className="mr-2 text-white"/>*/}
// {/*                        <span className="text-white">{session ? 'Sign Out' : 'Login'}</span>*/}
// {/*                    </button>*/}
// {/*                </li>*/}
// {/*{!session?.tokens?.token &&*/}
// {/*    <li onClick={handleRegister}>*/}
// {/*        <button*/}
// {/*            className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"*/}
// {/*        >*/}
// {/*            <TiClipboard className="mr-2 text-white"/>*/}
// {/*            <span className="text-white">Register</span>*/}
// {/*        </button>*/}
// {/*    </li>*/}
// {/*}*/}
// {/*                {!session?.tokens?.token &&*/}
// {/*                    <li onClick={handleForgotPassword}>*/}
// {/*                        <button*/}
// {/*                            className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"*/}
// {/*                        >*/}
// {/*                            <TbPasswordUser className="mr-2 text-white"/>*/}
// {/*                            <span className="text-white">Forgot password</span>*/}
// {/*                        </button>*/}
// {/*                    </li>*/}
// {/*                }*/}
// {/*                {!session || !session.tokens || !session.tokens.token &&*/}
// {/*                    <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">*/}
// {/*                        <FaUserCircle className="mr-2 text-white"/>*/}
// {/*                        <span className="text-white">Profile</span>*/}
// {/*                    </li>}*/}
//
// {/*                {!session || !session.tokens || !session.tokens.token && <li>*/}
// {/*                    <button*/}
// {/*                        onClick={getProfile}*/}
// {/*                        className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"*/}
// {/*                    >*/}
// {/*                        <FaUserCircle className="mr-2 text-white"/>*/}
// {/*                        <span className="text-white">Profile</span>*/}
// {/*                    </button>*/}
// {/*                </li>}*/}
// {/*            </ul>*/}
// {/*        </div>*/}
// {/*    )}*/}
// {/*</div>*/