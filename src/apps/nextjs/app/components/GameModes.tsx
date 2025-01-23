import {gameModes} from "@/lib/utils";
import React from "react";
import {NauSea} from "@/app/fonts/fonts";
import {FaBan} from "react-icons/fa6";
// <FaBan />

//todo to be deleted
type GameModesProps = {
    activeGameMode: string;
    onSelectGameMode: (gameMode: string) => void;
    tooltip: string;
};
export const GameMode = ({activeGameMode, onSelectGameMode, tooltip}: GameModesProps) => {
    return (<>
        <div className={`${NauSea.className} text-white pb-1`}>Game Modes</div>
        <div className="flex justify-between items-center pb-2" title={tooltip}>
            {gameModes.map((gameMode) => (
                <div key={gameMode}>
                    <button
                        className={`min-w-[50px] min-h-[30px] wheel border-solid border-1 border-slate-700 px-2 py-[2px] uppercase rounded text-white cursor-pointer ${activeGameMode === gameMode ? 'active' : ''} z-10`}
                        onClick={() => onSelectGameMode(gameMode)}>{gameMode === "blue" ? "50/50" : gameMode}</button>
                </div>
            ))}
        </div>
    </>)
}
GameMode.displayName = 'GameMode';
