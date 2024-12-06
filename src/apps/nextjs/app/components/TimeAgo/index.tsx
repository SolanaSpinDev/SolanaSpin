import {useState, useEffect} from 'react';

const TimeAgo = ({time}) => {
  const [timeAgo, setTimeAgo] = useState('');

  // Function to calculate time difference
  const calculateTimeAgo = (pastTime: number | Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((+now - +pastTime) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  useEffect(() => {

    const updateTimer = () => setTimeAgo(calculateTimeAgo(new Date(time)));
    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [time]);

  return <span className="text-xs xl:text-base">{timeAgo}</span>;
};

export default TimeAgo;
