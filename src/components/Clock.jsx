import "./css/Clock.css";
import { useEffect, useRef, useState } from "react";

const Clock = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [meridian, setMeridian] = useState("");
  const [viewedTimeFormat, setviewedTimeFormat] = useState(localStorage.getItem("timeFormat"));

  let interval = useRef();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let timeFormat = 12

  const startTimer = () => {
    interval = setInterval(() => {
      const dateObj = new Date();
      const now =
        dateObj.getTime() + -1 * dateObj.getTimezoneOffset() * 60 * 1000;

      // let hours = Math.floor(
      //   (now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      // ).toString();
      // let minutes = Math.floor(
      //   (now % (1000 * 60 * 60)) / (1000 * 60)
      // ).toString();
      // let seconds = Math.floor((now % (1000 * 60)) / 1000).toString();

      // if (hours.length == 2) {
      //   setHours(hours);
      // } else {
      //   setHours(`0${hours}`);
      // }

      // if (minutes.length == 2) {
      //   setMinutes(minutes);
      // } else {
      //   setMinutes(`0${minutes}`);
      // }

      // if (seconds.length == 2) {
      //   setSeconds(seconds);
      // } else {
      //   setSeconds(`0${seconds}`);
      // }

      let time = dateObj.toLocaleTimeString();

      if (time.length == 10) {
        time = `0${time}`
      }

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\s[AP]M)$/;

      const match = time.match(timeRegex);

      timeFormat = localStorage.getItem("timeFormat")
      if (!timeFormat) {
        timeFormat = 12;
        localStorage.setItem("timeFormat", timeFormat);
        setviewedTimeFormat(12)
      }

      if (match) {
        let hours = match[1];
        const minutes = match[2];
        const seconds = match[3];
        const meridian = match[4];

        setMinutes(minutes);
        setSeconds(seconds);
        setMeridian(meridian);

        if (timeFormat == 24) {
          tConvert(hours, meridian)
        } else {
          setHours(hours);
        }
      }

      const day = dateObj.getDay();
      setDay(daysOfWeek[day]);

      const date = dateObj.getDate();
      if (date.length == 2) {
        setDate(date);
      } else {
        setDate(`0${date}`);
      }

      const month = dateObj.getMonth();
      setMonth(months[month]);
    }, 1000);
  };


  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  function tConvert(hours, meridian) {
    if (meridian.trim() == "AM" && hours == "12") {
      setHours("00")
    }
    else if (meridian.trim() == "PM" && hours != "12") {
      setHours((Number(hours) + 12).toString());
    } else {
      setHours(hours)
    }
  }

  function changeTimeFormat() {
    const format = localStorage.getItem("timeFormat");
    if (format == 12) {
      localStorage.setItem("timeFormat", 24);
      setviewedTimeFormat(24)
    } else {
      localStorage.setItem("timeFormat", 12);
      setviewedTimeFormat(12)
    }
  }

  return (
    <div>
      <div className="Clock">
        <div className="time">
          <p>{hours}</p>:<p>{minutes}</p>
          <div>
            {viewedTimeFormat != 24 && <p className="seconds">{meridian}</p>}
            <p className="seconds">{seconds}</p>
          </div>
        </div>
        <div className="date">
          {day} - {month} {date}
        </div>

      </div>
      <div> <button
        onClick={() => {
          changeTimeFormat();
        }}
      >
        Change
      </button></div>
    </div>
  );
};

export default Clock;
