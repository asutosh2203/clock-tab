import "./css/Clock.css";
import { useEffect, useRef, useState } from "react";

const Clock = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime() + 19800000;

      const hours = Math.floor(
        (now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ).toString();
      const minutes = Math.floor(
        (now % (1000 * 60 * 60)) / (1000 * 60)
      ).toString();
      const seconds = Math.floor((now % (1000 * 60)) / 1000).toString();

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  function convert12(str) {
    var time = "";
    // Get Hours
    var h1 = Number(str[0] - "0");
    var h2 = Number(str[1] - "0");

    var hh = h1 * 10 + h2;

    // Finding out the Meridien of time
    // ie. AM or PM
    var meridian;

    if (hh < 12) {
      meridian = "AM";
    } else meridian = "PM";

    hh %= 12;

    // Handle 00 and 12 case separately
    if (hh == 0) {
      time += "12";

      // Printing minutes and seconds
      for (var i = 2; i < 8; ++i) {
        time += str[i];
      }
    } else {
      time += hh;
      // Printing minutes and seconds
      for (var i = 2; i < 8; ++i) {
        time += str[i];
      }
    }

    // After time is printed
    // cout Meridien

    time = time + " " + meridian;

    console.log(time);
  }

  // var str = hours + ":" + minutes + ":" + seconds;
  // convert12(str);

  return (
    <div className="Clock">
      {hours.length == 2 ? hours : `0${hours}`}:
      {minutes.length == 2 ? minutes : `0${minutes}`}:
      {seconds.length == 2 ? seconds : `0${seconds}`}
    </div>
  );
};

export default Clock;
