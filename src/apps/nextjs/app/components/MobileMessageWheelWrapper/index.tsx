'use client';

import React, {useState, useEffect} from 'react';
import WheelContainer from "@/app/components/WheelContainer/WheelContainer";
import Image from "next/legacy/image";
import {LogoTitle} from "@/app/components/LogoTitle";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MobileModal from "@/app/components/MobileModal";

export const MobileMessageWheelWrapper = () => {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const updateMedia = () => {
                setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
                setIsMobile(window.innerWidth <= 980);
            };

            updateMedia();

            // Set up event listeners
            const mediaQuery = window.matchMedia("(orientation: portrait)");
            mediaQuery.addEventListener("change", (e) => setIsPortrait(e.matches));
            window.addEventListener("resize", updateMedia);


            return () => {
                mediaQuery.removeEventListener("change", (e) => setIsPortrait(e.matches));
                window.removeEventListener("resize", updateMedia);
            };
        }
    }, []);
    useEffect(() => {
        toast.info('🎉 Welcome to Our Demo! 🎉\n' +
            'Stay tuned for updates, and have fun spinning! 🎡', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            onOpen: () => {
                localStorage.setItem('toastShown', 'true');
            },
        });
    }, []);


    return (<div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <WheelContainer/>

    </div>)
}
