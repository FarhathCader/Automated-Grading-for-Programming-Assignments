import React, { useState, useEffect } from 'react';

const CountDown = ({ contestDuration, enrollmentCreatedAt }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (enrollmentCreatedAt) { // Check if enrollmentCreatedAt is populated
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [enrollmentCreatedAt]); // Add enrollmentCreatedAt as a dependency

  function calculateTimeRemaining() {
    if (!enrollmentCreatedAt) return ''; // If enrollmentCreatedAt is not populated, return empty string

    const enrollmentTime = new Date(enrollmentCreatedAt).getTime();
    const now = new Date().getTime();
    const durationMillis = contestDuration * 60000; // Convert duration from minutes to milliseconds

    const remainingMillis = enrollmentTime + durationMillis - now;

    if (remainingMillis <= 0) {
      return null; // Return null when time is up
    }

    // Convert remaining milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(remainingMillis / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
    const minutes = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <p className="text-xl text-gray-700 text-center">
        {timeRemaining === null ? 'Contest Ended' : `Time Remaining: ${timeRemaining}`}
      </p>
    </div>
  </div>
  );
};

export default CountDown;
