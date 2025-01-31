import Image from "next/image";
import {NauSea} from "@/app/fonts/fonts";
import React from "react";

export const LogoTitle = React.memo(({ showBeta = true }: { showBeta?: boolean }) => {
    return (
        <div
            className=" flex lg:flex-row items-center justify-center cursor-pointer">

            <div className="relative w-[40px] lg:w-[80px] h-[40px] lg:h-[80px]">
                <Image
                    src="/images/logo.svg"
                    alt="Centered Image"
                    loading="lazy"
                    quality={75}
                    fill
                    sizes="(max-width: 640px) 40px,
           (max-width: 1024px) 40px,
           40px"
                    className="object-contain"
                />
            </div>
            <div className="flex">
                <div className={`${NauSea.className} text-white text-tiny lg:text-3xl`}>
                    <span>Solana spin</span> {showBeta && <span>-<span>beta</span></span>}
                </div>
            </div>
        </div>
    )
})
LogoTitle.displayName = 'LogoTitle';
