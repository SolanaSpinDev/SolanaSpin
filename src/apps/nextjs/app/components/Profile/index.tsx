'use client';

import React, {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {Button} from "@/app/components/Button/Page";
import {IoMdNotifications} from "react-icons/io";
import {FaCircleUser} from "react-icons/fa6";
import {Notifications} from "./Notifications";

export const Profile = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const {data: session} = useSession();
    const router = useRouter();

    const handleToggleNotifications = () => {
        setIsNotificationsOpen((prev) => !prev);
    };
    const handleCloseNotifications = () => {
        setIsNotificationsOpen(false);
    };

    function handleProfile() {
        router.push('/user/withdraw')
    }

    const handleLogin = () => {
        router.push('/login');
    }

    const handleRegister = () => {
        router.push('/register-user');
    };

    return (<div className="mr-2">
        <ul className="flex items-center justify-center gap-3 text-white">
            {session?.tokens?.token &&
                <li className="flex justify-center items-center cursor-pointer" onClick={handleProfile}>
                    <FaCircleUser className="xl:text-2xl"/>
                    {session?.user?.email && <div className="ml-2">Hello {session?.user?.email}</div>}
                </li>
            }
            {session?.tokens?.token &&
                <li>
                    <IoMdNotifications className="xl:text-2xl" onClick={handleToggleNotifications}/>
                    {isNotificationsOpen && (
                        <div className="fixed top-0 right-0 bottom-0 left-o w-full h-full z-20 bg-black/25"
                             onClick={() => setIsNotificationsOpen(false)}>
                            <div className="absolute right-10 top-8 xl:top-20 w-96 shadow-lg">
                                <Notifications onClose={handleCloseNotifications}/>
                            </div>
                        </div>
                    )}
                </li>
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
