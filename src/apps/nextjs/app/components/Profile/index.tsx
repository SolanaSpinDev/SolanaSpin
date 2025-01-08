import React, {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {fetchWithAuth} from "@/app/api/utils/api";

import {FaSignInAlt, FaUserCircle} from "react-icons/fa";
import {FaCircleUser} from "react-icons/fa6";

export const Profile = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const {data: session} = useSession();

    console.log('session = ', session);
    const getProfile = async () => {

        if (!session?.tokens?.token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const url = "/api/users/profile"
            const data = await fetchWithAuth(url, "GET", session.tokens?.token)

            //todo remove this console.log
            console.log("Protected data:", data);
        } catch (error) {
            console.error("Error fetching protected data:", error);
        }
    };

    return (
        <div className="flex pr-4"
             role="button"
             aria-haspopup="true"
             aria-expanded={isMenuVisible}
             onMouseEnter={() => setIsMenuVisible(true)}
             onMouseLeave={() => setIsMenuVisible(false)}
             onFocus={() => setIsMenuVisible(true)}
             onBlur={() => setIsMenuVisible(false)}
             tabIndex={0}
        >
            <FaCircleUser className="xl:text-2xl"/>
            {session?.user?.firstName && <div className="ml-2">Hello {session?.user?.firstName}</div>}
            {isMenuVisible && (
                <div className="absolute right-1.5 mt-2 w-40 bg-gray-500 border border-gray-600 shadow-lg rounded-lg">
                    <ul>
                        <li>
                            <button
                                onClick={() => session ? signOut() : signIn("Login")}
                                className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            >
                                <FaSignInAlt className="mr-2 text-white"/>
                                <span className="text-white">{session ? 'Sign Out' : 'Sign In'}</span>
                            </button>
                        </li>
                        {!session || !session.tokens || !session.tokens.token &&
                            <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                <FaUserCircle className="mr-2 text-white"/>
                                <span className="text-white">Profile</span>
                            </li>}

                        <li>
                            <button
                                onClick={getProfile}
                                className="flex items-center w-full px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            >
                                <FaUserCircle className="mr-2 text-white"/>
                                <span className="text-white">Profile</span>
                            </button>
                        </li>

                    </ul>
                </div>
            )}
        </div>
    )
}
// {
//   "firstName": "Vasile",
//   "lastName": "Costel",
//   "email": "vasile@vasile.com",
//   "userName": "vasile",
//   "password": "###vasile$$$",
//   "confirmPassword": "###vasile$$$",
//   "phoneNumber": "0722111333"
// }
// bfaac79a-0dab-4d5e-88ea-848b74af8f68
// {
//     "firstName": "vasile",
//     "lastName": "cccc",
//     "email": "ddd@ddd.com",
//     "userName": "ffff",
//     "password": "tttttt123!",
//     "confirmPassword": "tttttt123!",
//     "phoneNumber": "07564636634"
// }