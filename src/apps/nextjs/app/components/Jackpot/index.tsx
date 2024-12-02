import React, {useEffect, useState} from "react";
import Image from "next/legacy/image";
import {getRandomNumber, jackpotLimit} from "@/lib/utils";
import './Jackpot.css'
import {NauSea} from "@/app/fonts/fonts";

export const Jackpot = ({jackpotReached}) => {
    const [progress, setProgress] = useState(0);
    const [jackpotValue, setJackpotValue] = useState(getRandomNumber(jackpotLimit - 73, jackpotLimit + 45));

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevNumber => {
                if (prevNumber < 100) {
                    if (prevNumber === 75) {
                        setJackpotValue(getRandomNumber(jackpotLimit - 73, jackpotLimit + 45))
                    }
                    return prevNumber + 25
                }
                return prevNumber;
            });

        }, 60000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (progress === 100) {
            jackpotReached({jackpotValue, progress});

            setProgress(0);
        }
    }, [progress, jackpotValue, jackpotReached]);

    return (
        <div className="flex flex-col items-center">
            <Image src="/images/jackpot.webp"
                   alt="Centered Image"
                   loading="lazy"
                   className="max-w-[130px] lg:max-w-[200px] xl:max-w-[300px] h-auto"
                   quality={75}
                   width={300}
                   height={300}/>
            <div
                className="flex flex-col w-[130px] lg:w-[200px] h-[12px] lg:h-[18px] bg-gray-300 rounded relative overflow-hidden">
                <div className="progress-bar" style={{width: `${progress}%`}}></div>
                <div
                    className={`${NauSea.className} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black z-20 tracking-[1px] font-thin`}>${(progress / 100) * jackpotValue}</div>
            </div>
        </div>
    )
}
