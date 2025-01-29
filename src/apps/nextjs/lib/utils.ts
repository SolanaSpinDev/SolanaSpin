//todo remoe those images since they become obsolete
import Image1 from "@/public/images/bank_note_1.png";
import Image5 from "@/public/images/bank_note_5.png";
import Image10 from "@/public/images/bank_note_10.png";
import Image20 from "@/public/images/bank_note_20.png";

export const middleEllipsis = (str: string, len: number) => {
    if (!str) {
        return '';
    }

    return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
};
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//todo update the computePrize with the new logic or remove this one
export const computePrize = (videoId: number, wheelPositions: number, activeBet: number): {
    prize: number,
    outcome: string
} => {
    console.log('in computePrize we have, ', videoId,
        wheelPositions,
        activeBet)
    switch (videoId) {
        case wheelPositions + 1:
            return {prize: activeBet * 6, outcome: 'gift'};
        case wheelPositions + 2:
        case wheelPositions + 3:
        case wheelPositions + 4:
            return {prize: -activeBet, outcome: 'no win'};
        case wheelPositions + 5:
            return {prize: 1, outcome: 'ticket'};
        case wheelPositions + 6:
        case wheelPositions + 7:
        case wheelPositions + 8:
        case wheelPositions + 9:
            return {prize: activeBet, outcome: 'X1'};
        case wheelPositions + 10:
        case wheelPositions + 11:
        case wheelPositions + 12:
            return {prize: activeBet * 2, outcome: 'X2'};
        case wheelPositions + 13:
        case wheelPositions + 14:
            return {prize: activeBet * 5, outcome: 'X5'};
        default:
            return {prize: 0, outcome: ''};
    }
}
export const formatCurrency = (number: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // Ensures two decimal places
    }).format(number);
};

export const jackpotLimit = 500;
export const bets = [
    {value: 1, src: Image1},
    {value: 5, src: Image5},
    {value: 10, src: Image10},
    {value: 20, src: Image20},
];
export const gameModes: string[] = ['blue', 'wood', 'white', 'vip']
export const wheelsConfig = {
    "wood": {
        "title": "2️⃣ Wood Wheel",
        "slug": "wood",
        "maximumPlayAmount": null,
        "minimumPlayAmount": null,
        "faces": [
            {
                "resultType": 4,
                "resultValue": "🎁 gift",
                "resultValueToShow": "🎁 gift",
                "videoNamingConvention": "Gift_Box",
            },
            {
                "resultType": 1,
                "resultValue": "0.1",
                "resultValueToShow": "X0.1",
                "videoNamingConvention": "X01_C",
            },
            {
                "resultType": 3,
                "resultValue": "diamond",
                "resultValueToShow": "diamond",
                "videoNamingConvention": "Diamond",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "resultValueToShow": "💀 lose",
                "videoNamingConvention": "No_Win_C",
            },
            {
                "resultType": 1,
                "resultValue": "5",
                "resultValueToShow": "X5",
                "videoNamingConvention": "X5",
            },
            {
                "resultType": 1,
                "resultValue": "0.1",
                "resultValueToShow": "X0.1",
                "videoNamingConvention": "X01_B",
            },
            {
                "resultType": 1,
                "resultValue": "0.5",
                "resultValueToShow": "X0.5",
                "videoNamingConvention": "X05_B",
            },
            {
                "resultType": 4,
                "resultValue": "🎟️ ticket",
                "resultValueToShow": "🎟️ ticket",
                "videoNamingConvention": "Ticket",
            },
            {
                "resultType": 1,
                "resultValue": "0.1",
                "resultValueToShow": "X0.1",
                "videoNamingConvention": "X01_A",
            },
            {
                "resultType": 3,
                "resultValue": "wood",
                "resultValueToShow": "Free Spin",
                "videoNamingConvention": "Free_Spin",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "resultValueToShow": "💀 lose",
                "videoNamingConvention": "No_Win_B",
            },
            {
                "resultType": 1,
                "resultValue": "50",
                "resultValueToShow": "X50",
                "videoNamingConvention": "X50",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "resultValueToShow": "💀 lose",
                "videoNamingConvention": "No_Win_A",
            },
            {
                "resultType": 1,
                "resultValue": "0.5",
                "videoNamingConvention": "X05_A",
                "resultValueToShow": "X0.5",
            }
        ]
    },
    "blue": {
        "title": "1️⃣ Blue Wheel",
        "slug": "blue",
        "faces": [
            {
                "resultType": 1,
                "resultValue": "2",
                "videoNamingConvention": "X2",
                "resultValueToShow": "X2",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "videoNamingConvention": "No_Win",
                "resultValueToShow": "💀 lose",
            },
            {
                "resultType": 1,
                "resultValue": "2",
                "videoNamingConvention": "X2",
                "resultValueToShow": "X2",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "videoNamingConvention": "No_Win",
                "resultValueToShow": "💀 lose",
            },
            {
                "resultType": 1,
                "resultValue": "2",
                "videoNamingConvention": "X2",
                "resultValueToShow": "X2",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "videoNamingConvention": "No_Win",
                "resultValueToShow": "💀 lose",
            },
            {
                "resultType": 1,
                "resultValue": "2",
                "videoNamingConvention": "X2",
                "resultValueToShow": "X2",
            },
            {
                "resultType": 0,
                "resultValue": "💀 lose",
                "videoNamingConvention": "No_Win",
                "resultValueToShow": "💀 lose",
            }
        ]
    }
}

export class BackendValidationError extends Error {
    details: Record<string, string>;

    constructor(message: string, details) {
        super(message);
        this.name = "BackendValidationError";
        this.details = details.details;
    }
}

export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
}
