import Image from "next/image";
import {NauSea} from "@/app/fonts/fonts";
import React from "react";

export const LogoTitle = React.memo(() => {
  return (
      <div
          className=" flex lg:flex-row items-center justify-center">

          <div className="relative w-[40px] lg:w-[40px] xl:w-[40px] h-[40px] lg:h-[40px] xl:h-[40px]">
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
              <div className={`${NauSea.className} text-white text-tiny lg:text-4xl`}>
                  <span>Solana spin</span> - <span>beta</span>
              </div>
          </div>
      </div>
  )
})
LogoTitle.displayName = 'LogoTitle';
