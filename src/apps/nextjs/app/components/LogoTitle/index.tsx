import Image from "next/image";
import {NauSea} from "@/app/fonts/fonts";
import React from "react";
import {Balance} from "@/app/components/Balance";

export const LogoTitle = React.memo(() => {
  return (
    <div className="absolute top-0 left-0 right-0 lg:right-auto flex flex-col lg:flex-row items-center justify-center">
      <div className="w-20 sm:w-32 md:w-40 lg:w-48 xl:w-56 flex items-center justify-center">
        <Image
          src="/images/logo.svg"
          alt="Responsive Logo"
          className="max-w-[80px] lg:max-w-[200px] w-full h-auto"
          width={200}
          height={200}
        />
      </div>
      <div className="flex">
        <div className={`${NauSea.className} text-white text-base lg:text-4xl`}>
          <span>Solana spin</span> - <span>Demo</span>
        </div>
      </div>
    </div>
  )
})
LogoTitle.displayName = 'LogoTitle';
