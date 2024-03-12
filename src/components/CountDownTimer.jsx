import { useState } from "react";
import React from "react";

const CountDownTimer = () => {
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  var countDownDate = new Date("Apr 5, 2024 00:00:00").getTime();
  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(x);
      return "EXPIRED";
    }

    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, 1000);

  return (
    <div className="mt-3">
      <span className="d-inline-block m-1 p-2 fw-normal bg-primary rounded-1 text-white">
        {days}
        <div className="fs-p6">DAYS</div>
      </span>
      <span className="d-inline-block m-1 p-2 fw-normal bg-primary rounded-1 text-white">
        {hours}
        <div className="fs-p6">HRS</div>
      </span>
      <span className="d-inline-block m-1 p-2 fw-normal bg-primary rounded-1 text-white">
        {minutes}
        <div className="fs-p6">MINS</div>
      </span>
      <span className="d-inline-block m-1 p-2 fw-normal bg-primary rounded-1 text-white">
        {seconds}
        <div className="fs-p6">SECS</div>
      </span>
    </div>
  );

};

export default CountDownTimer;
