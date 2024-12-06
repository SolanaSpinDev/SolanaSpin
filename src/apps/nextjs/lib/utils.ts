import Image1 from "@/public/images/bank_note_1.png";
import Image5 from "@/public/images/bank_note_5.png";
import Image10 from "@/public/images/bank_note_10.png";
import Image20 from "@/public/images/bank_note_20.png";
import Image50 from "@/public/images/bank_note_50.png";

export const middleEllipsis = (str: string, len: number) => {
    if (!str) {
        return '';
    }

    return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
};
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

export const videoSourcesHighRes = [
    "videos/720p/S_W_Separate_Wood_Start_Gift Box.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X0.1 C.mp4",
    "videos/720p/S_W_Separate_Wood_Start_Diamond.mp4",
    "videos/720p/S_W_Separate_Wood_Start_No Win C.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X5.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X0.1 B.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X0.5 B.mp4",
    "videos/720p/S_W_Separate_Wood_Start_Ticket.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X0.1 A.mp4",
    "videos/720p/S_W_Separate_Wood_Start_Free Spin.mp4",
    "videos/720p/S_W_Separate_Wood_Start_No Win B.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X50.mp4",
    "videos/720p/S_W_Separate_Wood_Start_No Win A.mp4",
    "videos/720p/S_W_Separate_Wood_Start_X0.5 A.mp4",
    "videos/720p/S_W_Separate_Wood_Result_Gift Box.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X0.1 C.mp4",
    "videos/720p/S_W_Separate_Wood_Result_Diamond.mp4",
    "videos/720p/S_W_Separate_Wood_Result_No Win C.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X5.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X0.1 B.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X0.5 B.mp4",
    "videos/720p/S_W_Separate_Wood_Result_Ticket.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X0.1 A.mp4",
    "videos/720p/S_W_Separate_Wood_Result_Free Spin.mp4",
    "videos/720p/S_W_Separate_Wood_Result_No Win B.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X50.mp4",
    "videos/720p/S_W_Separate_Wood_Result_No Win A.mp4",
    "videos/720p/S_W_Separate_Wood_Result_X0.5 A.mp4",
];
export const wheelPositions = 14;
export const jackpotLimit = 500;
export const predefinedBets = [
    {value: 1, src: Image1},
    {value: 5, src: Image5},
    {value: 10, src: Image10},
    {value: 20, src: Image20},
    {value: 50, src: Image50},
];
export const wheels: string[] = ['wood', 'diamond', '50%']
