import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-1 sm:mx-4 animate-float" style={{ animationDelay: `${Math.random()}s` }}>
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border-2 border-blue-100 hover:border-wedding-royal transition-colors duration-300">
        <span className="text-xl sm:text-4xl font-cinzel text-wedding-royal font-bold">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="mt-2 text-[10px] sm:text-sm font-serif text-slate-600 uppercase tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center flex-wrap gap-2 sm:gap-0 py-8">
      <TimeUnit value={timeLeft.days} label="Días" />
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};

export default Countdown;