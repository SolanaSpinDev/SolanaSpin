import Image from "next/image";
import {NauSea} from "@/app/fonts/fonts";
import React from "react";

export const LogoTitle = React.memo(() => {
  return (
      <div
          className="absolute top-0 left-0 right-0 lg:right-auto flex flex-col lg:flex-row items-center justify-center">

          <div className="relative w-[80px] lg:w-[200px] xl:w-[200px] h-[80px] lg:h-[200px] xl:h-[200px]">
              <Image
                  src="/images/logo.svg"
                  alt="Centered Image"
                  loading="lazy"
                  quality={75}
                  fill
                  sizes="(max-width: 640px) 80px,
           (max-width: 1024px) 200px,
           200px"
                  className="object-contain"
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
