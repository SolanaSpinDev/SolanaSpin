import {GoMute, GoUnmute} from "react-icons/go";
import {Socials} from "@/app/components/Socials";
import {bets} from "@/lib/utils";
import {StaticImageData} from "next/legacy/image";
import React from "react";
import {NauSea} from "@/app/fonts/fonts";

type FooterProps = {
    activeGameMode: string,
    isMuted: boolean;
    onToggleMute: () => void;
    activeBet: number;
    onSelectBet: (betValue: number) => void;
};

export const Footer: React.FC<FooterProps> = ({activeGameMode, isMuted, onToggleMute, activeBet, onSelectBet}) => {
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
                            <div onClick={() => {
                                if (activeGameMode === 'wood' || activeGameMode === 'blue') {
                                    onSelectBet(bet.value)
                                }
                                return;
                            }}
                                 className={`${NauSea.className} w-[45px] lg:w-[100px] h-[40px] lg:h-[56px] bg-black text-white text-base lg:text-3xl flex items-center justify-center border-solid border-1 border-white rounded`}
                            >$ {bet.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>)
}
Footer.displayName = 'Footer';
