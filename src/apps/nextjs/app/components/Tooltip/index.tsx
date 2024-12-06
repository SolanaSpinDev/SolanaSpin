import {useState} from 'react';

export default function Tooltip({text}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            role="button"
            className="relative inline-block ml-1.5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Info Icon */}
            <span
                className="flex items-center justify-center rounded-full border-1 border-solid border-white text-yellow-300 cursor-pointer w-4 lg:w-6 h-4 lg:h-6">i</span>

            {/* Tooltip Text */}
            {isHovered && (
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-amber-900 text-white text-sm rounded-md px-2 py-1 z-10 shadow-lg min-w-[250px]">
                    {text}
                </div>
            )}
        </div>
    );
}
