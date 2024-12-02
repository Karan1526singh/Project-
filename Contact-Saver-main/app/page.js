"use client";

import React, { useState, useEffect } from 'react';
import Loader from '@/components/loader';
import MainPage from '@/components/mainPage';

const PASSWORD = "Nilendra@2613"
// Days * Hours * minutes * seconds * milliseconds
const TEN_MINUTES = 365 * 24 * 60 * 60 * 1000;

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    // Check if the password was recently entered
    const lastCorrectPasswordTime = localStorage.getItem('lastCorrectPasswordTime');
    if (lastCorrectPasswordTime && (new Date().getTime() - lastCorrectPasswordTime) < TEN_MINUTES) {
      setIsPasswordCorrect(true);
    }

    return () => clearTimeout(timeout);
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const savedPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (password === savedPassword) {
      setIsPasswordCorrect(true);
      localStorage.setItem('lastCorrectPasswordTime', new Date().getTime());
    } else {
      alert('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div>
      {!isPasswordCorrect ? (
        <div className="flex flex-col items-center justify-start pt-36 sm:px-32">
          <img src="/logo.png" alt="" className='w-40 my-5' />
          <h2 className="text-2xl mb-4">Enter Password</h2>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 py-2 px-4 rounded-md outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <MainPage />
      )}
    </div>
  );
}
