'use client';

import React, {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {Button} from "@/app/components/Button/Page";
import {IoMdNotifications} from "react-icons/io";
import {FaCircleUser} from "react-icons/fa6";
import {Notifications} from "./Notifications";
import {SiGitconnected} from "react-icons/si";
import {FiEdit} from "react-icons/fi";
import {RiVipCrownLine} from "react-icons/ri";
import {PiSignOutBold} from "react-icons/pi";
import {IoTriangle} from "react-icons/io5";

export const Profile = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const {data: session, status} = useSession();
    const router = useRouter();

    const handleToggleNotifications = () => {
        if (status === 'unauthenticated') {
            return router.push('/login');
        }
        setIsNotificationsOpen((prev) => !prev);
    };
    const handleCloseNotifications = () => {
        setIsNotificationsOpen(false);
    };

    const handleLogin = () => {
        router.push('/login');
    }

    const handleRegister = () => {
        router.push('/register-user');
    };
    const handleEditProfile = () => {
        router.push('/user/edit-profile');
    }
    const handleReferral = () => {
        router.push('/user/referral');
    }
    return (<div className="mr-2">
        <ul className="flex items-center justify-center gap-3 text-white height-[40px] relative">
            {session?.tokens?.token &&
                <li className="flex justify-center items-center  cursor-pointer" role="button"
                    aria-haspopup="true"
                    aria-expanded={isMenuVisible}
                    onMouseEnter={() => setIsMenuVisible(true)}
                    onMouseLeave={() => setIsMenuVisible(false)}
                    onFocus={() => setIsMenuVisible(true)}
                    onBlur={() => setIsMenuVisible(false)}
                    tabIndex={0}>
                    <FaCircleUser className="xl:text-2xl"/>
                    {session?.user?.email && <div className="ml-2 hidden md:inline-block">Hello {session?.user?.email}</div>}
                    {isMenuVisible && (
                        <div
                            className="absolute top-0 w-52 ">
                            <div className="relative flex flex-col items-center">
                                <div className="bg-transparent h-[15px] lg:h-[40px]"></div>
                                <div className="bg-transparent w-full flex items-center justify-center lg:h-[20px]">
                                    <IoTriangle className="text-tiny lg:text-xl text-sky-950"/></div>
                                <ul className="bg-sky-950 border border-sky-900 shadow-lg rounded font-bold">
                                    <li className="flex items-center gap-2 p-3 lg:p-4 hover:bg-sky-900"
                                        onClick={handleEditProfile}>
                                        <FiEdit/>
                                        <div> Edit Profile</div>
                                    </li>
                                    <li className="flex items-center gap-2 p-3 lg:p-4 hover:bg-sky-900"
                                        onClick={handleReferral}>
                                        <SiGitconnected/>
                                        <div>Referral</div>
                                    </li>
                                    <li className="flex items-center gap-2 p-3 lg:p-4 relative">
                                        <RiVipCrownLine/>
                                        <div>VIP</div>
                                        <span
                                            className="absolute right-0 text-tiny text-yellow-500 font-bold rotate-45 flex flex-col items-center">
                                            <span>Coming</span>
                                            <span>Soon!</span>
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 p-3 lg:p-4 hover:bg-sky-900"
                                        onClick={() => signOut()}>
                                        <PiSignOutBold/>
                                        <div>Sign-out</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
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
