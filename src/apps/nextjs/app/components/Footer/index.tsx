import {GoMute, GoUnmute} from "react-icons/go";
import {Socials} from "@/app/components/Socials";
import {bets} from "@/lib/utils";
import Image, {StaticImageData} from "next/legacy/image";
import React from "react";

type FooterProps = {
    isMuted: boolean;
    onToggleMute: () => void;
    activeBet: number;
    onSelectBet: (betValue: number) => void;
};

export const Footer: React.FC<FooterProps> = ({isMuted, onToggleMute, activeBet, onSelectBet}) => {
    return (
        <div className="relative flex items-center justify-between w-full">
            <div className="flex items center justify-center space-x-4 pl-4">
                {isMuted &&
                    <GoMute className="text-white text-xl lg:text-3xl" onClick={onToggleMute}/>
                }
                {!isMuted &&
                    <GoUnmute className="text-white text-xl lg:text-3xl" onClick={onToggleMute}/>
                }
                <Socials/>
            </div>
            <div className="bets-container absolute left-1/2 -translate-x-1/2 text-center">
                <div
                    className="relative flex flex-row  items-center justify-center w-full pb-1">
                    {bets.map((bet: { value: number, src: StaticImageData }) => (
                        <div
                            className={`flex relative cursor-pointer rounded-lg max-w-[50px] lg:max-w-[100px] mx-[3px] image-button-container ${activeBet === bet.value ? 'active' : ''}`}
                            key={bet.value}>
                            <Image
                                src={bet.src}
                                className=""
                                alt="lorem"
                                width={443}
                                height={256}
                                onClick={() => onSelectBet(bet.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>)
}
Footer.displayName = 'Footer';
