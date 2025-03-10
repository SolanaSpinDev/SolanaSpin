import React from "react";
import TimeAgo from "@/app/components/TimeAgo";
import clsx from "clsx";
import {NauSea} from '@/app/fonts/fonts';
import {formatCurrency} from "@/lib/utils";

interface RecentPlaysProps {
    plays: Play[];
    ticket: number;
}

const RecentPlays: React.FC<RecentPlaysProps> = React.memo(({plays, ticket}) => {
    return (
        <div className="flex flex-col items-center justify-center z-20 lg:pr-0">
            <div
                className="flex items-center justify-between min-w-[220px] lg:min-w-[300px] xl:min-w-[450px] mb-5 text-sm lg:text-xl">
                <div className={`${NauSea.className} text-white text-sm lg:text-base xl:text-lg`}>Recent Plays</div>
                <div className={`${NauSea.className} text-white text-sm lg:text-base xl:text-lg`}><span
                    className="text-sm lg:text-base xl:text-lg">🎟️</span> Tickets {ticket}
                </div>
            </div>
            {plays.length > 0 && (
                <div className="max-h-[170px] lg:max-h-[235px] xl:max-h-[285px] overflow-y-auto plays-container">
                    {plays.map((play: Play, i: number) => (
                        <div
                            className="p-1 lg:p-2 2xl:p-4 bg-black bg-opacity-25 text-white flex justify-between min-w-[200px] lg:min-w-[220px] 2xl:min-w-[450px] border-b-1 border-solid border-zinc-500 last:border-b-0"
                            key={i}>
                            <div className="flex items-center justify-center text-xs   xl:text-base">
                                <div>
                                    <span
                                        className="capitalize">{play.name.length > 15 ? play.name.substring(0, 15) + ".." : play.name}</span>
                                    <span className="hidden lg:inline"> spun <span
                                        className="lg:hidden xl:inline-block">a</span></span>
                                </div>
                                {/*/todo update colors because outcome is changed/*/}
                                <div className={clsx("capitalize px-1 ", {
                                    "text-red-500": play.outcome === "X0.1",
                                    "text-pink-500": play.outcome === "X0.5",
                                    "text-green-500": play.outcome === "X50",
                                    "text-sky-500": play.outcome === "X5",
                                    "text-orange-500 font-thin ": play.outcome === "gift",
                                    "text-amber-500": play.outcome === "ticket",
                                    "text-zinc-500": play.outcome === "no win"
                                })}>{play.outcome} </div>
                                {typeof (play.prize) === 'number' &&
                                    <>
                                        <div>
                                            <span className="hidden xl:inline"> and </span>
                                            <span>{play.prize >= 0 ? ' won ' : ' lost '}</span>
                                        </div>
                                        <div className={clsx(["px-1"], {
                                            [NauSea.className]: true,
                                            "text-emerald-500": play.prize >= 0,
                                            "text-orange-500 font-thin ": play.prize < 0,
                                        })}>{formatCurrency(play.prize)}</div>
                                    </>
                                }
                            </div>
                            <div className="">
                                <TimeAgo time={play.time}/>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
})
RecentPlays.displayName = "RecentPlays";
export default RecentPlays;
