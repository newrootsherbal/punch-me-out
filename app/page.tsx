"use client";

import { useState } from 'react';
import VideoModal from './components/VideoModal';

export default function Home() {
  const [totalHoursInput, setTotalHoursInput] = useState<string>('');
  const [arrivalTimeInput, setArrivalTimeInput] = useState<string>('08:00');
  const [punchOutTime, setPunchOutTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculatePunchOutTime = () => {
    setError(null);
    setPunchOutTime(null);

    const totalHours = parseFloat(totalHoursInput);
    if (isNaN(totalHours) || totalHours < 0) {
      setError('Please enter a valid number for total hours worked.');
      return;
    }

    if (!/^\d{2}:\d{2}$/.test(arrivalTimeInput)) {
        setError('Please enter arrival time in HH:MM format (e.g., 08:30).');
        return;
    }

    const [arrivalHour, arrivalMinute] = arrivalTimeInput.split(':').map(Number);
    if (arrivalHour < 0 || arrivalHour > 23 || arrivalMinute < 0 || arrivalMinute > 59) {
        setError('Invalid arrival time.');
        return;
    }

    const standardBiWeeklyHours = 80;
    const remainingHoursDecimal = standardBiWeeklyHours - totalHours;

    if (remainingHoursDecimal <= 0) {
        setPunchOutTime("You've already completed your hours! Go home!");
        return;
    }

    const remainingHours = Math.floor(remainingHoursDecimal);
    const remainingMinutes = Math.round((remainingHoursDecimal - remainingHours) * 60);

    const arrivalDate = new Date();
    arrivalDate.setHours(arrivalHour, arrivalMinute, 0, 0);

    const punchOutDate = new Date(arrivalDate.getTime());
    punchOutDate.setHours(punchOutDate.getHours() + remainingHours);
    punchOutDate.setMinutes(punchOutDate.getMinutes() + remainingMinutes);

    const punchOutHour = punchOutDate.getHours().toString().padStart(2, '0');
    const punchOutMinute = punchOutDate.getMinutes().toString().padStart(2, '0');

    setPunchOutTime(`${punchOutHour}:${punchOutMinute}`);
    
    // Set timer for video modal
    setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 animate-pulse">
          Punch Me Out! 🥊
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Calculate your Friday escape time!
        </p>

        <div className="mb-4">
          <label htmlFor="totalHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
            Total Hours (Last 2 Weeks)
          </label>
          <input
            type="number"
            id="totalHours"
            value={totalHoursInput}
            onChange={(e) => setTotalHoursInput(e.target.value)}
            placeholder="e.g., 72.5"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left">
            Friday Arrival Time (HH:MM)
          </label>
          <input
            type="time"
            id="arrivalTime"
            value={arrivalTimeInput}
            onChange={(e) => setArrivalTimeInput(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          onClick={calculatePunchOutTime}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Calculate Punch Out Time!
        </button>

        {error && (
          <p className="mt-4 text-red-500 dark:text-red-400 font-semibold animate-bounce">
            Error: {error}
          </p>
        )}

        {punchOutTime && (
          <div className="mt-8 p-6 bg-green-100 dark:bg-green-900 rounded-lg border border-green-300 dark:border-green-700 shadow-inner">
            <p className="text-lg font-semibold text-green-800 dark:text-green-100">Your estimated Punch Out Time is:</p>
            <p className="text-4xl font-extrabold text-green-600 dark:text-green-300 mt-2 animate-bounce">
              {punchOutTime}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Time to pack your bags!</p>
          </div>
        )}
      </div>
    </main>
  );
}
