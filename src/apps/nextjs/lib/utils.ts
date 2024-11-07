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
  switch (videoId) {
    case wheelPositions * 2 + 1:
      return {prize: activeBet * 6, outcome: 'gift'};
    case wheelPositions * 2 + 2:
    case wheelPositions * 2 + 3:
    case wheelPositions * 2 + 4:
      return {prize: -activeBet, outcome: 'no win'};
    case wheelPositions * 2 + 5:
      return {prize: 1, outcome: 'ticket'};
    case wheelPositions * 2 + 6:
    case wheelPositions * 2 + 7:
    case wheelPositions * 2 + 8:
    case wheelPositions * 2 + 9:
      return {prize: activeBet, outcome: 'X1'};
    case wheelPositions * 2 + 10:
    case wheelPositions * 2 + 11:
    case wheelPositions * 2 + 12:
      return {prize: activeBet * 2, outcome: 'X2'};
    case wheelPositions * 2 + 13:
    case wheelPositions * 2 + 14:
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
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_Gift_Box.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_No_Win_A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_No_Win_B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_No_Win_C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_Ticket.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X1A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X1B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X1C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X1D.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X2A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X2B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X2C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X5A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Start_X5B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_Gift_Box.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_No_Win_A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_No_Win_B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_No_Win_C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_Ticket.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X1A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X1B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X1C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X1D.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X2A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X2B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X2C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X5A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Stop_X5B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_Gift_Box.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_No_Win_A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_No_Win_B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_No_Win_C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_Ticket.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X1A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X1B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X1C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X1D.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X2A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X2B.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X2C.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X5A.mp4",
  "https://solanaspin.io/videos/720p/S_W_Separate_Wood_Result_X5B.mp4"
];
export const wheelPositions = 14;
export const jackpotLimit = 500;
export const predefinedBets = [5, 25, 50, 100];
