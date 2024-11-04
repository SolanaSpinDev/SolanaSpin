import React, {useEffect, useState} from 'react';
import confetti from 'canvas-confetti';
import './PrizeAnnouncement.css'
import {NauSea} from "@/app/fonts/fonts";
import {Balance} from "@/app/components/Balance";

const PrizeAnnouncement = React.memo(
    ({hasWon, message, onAnimationComplete}: { hasWon: boolean, message: string, onAnimationComplete: () => void }) => {
        const [isVisible, setIsVisible] = useState(false);
        console.log('prize is announced')
        const triggerConfetti = () => {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: {y: 0.6},
            });
        };
        useEffect(() => {
            if (hasWon) {
                setIsVisible(true);
            }
        }, [hasWon]);

        useEffect(() => {
            if (hasWon) {
                triggerConfetti();
            }
        }, [hasWon]);

        const handleAnimationEnd = () => {
            setIsVisible(false);
            onAnimationComplete()
        };

        return (
            <>
                {isVisible && hasWon && <div className="absolute bg-black/75 w-full h-full block z-50">
                    <div className={`z-30 text-red-900 prize-display`} onAnimationEnd={handleAnimationEnd}>
                        <h1 className={`${NauSea.className} tracking-[3px] font-thin`}>{message}</h1>
                    </div>
                </div>}
            </>
        );
    });
PrizeAnnouncement.displayName = 'PrizeAnnouncement';
export default PrizeAnnouncement;
