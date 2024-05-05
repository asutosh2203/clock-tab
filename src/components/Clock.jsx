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
  const [timeFormat, setTimeFormat] = useState();

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

      const time = dateObj.toLocaleTimeString();

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\s[AP]M)$/;

      const match = time.match(timeRegex);

      if (match) {
        let hours = match[1];
        const minutes = match[2];
        const seconds = match[3];
        const meridian = match[4];

        if (timeFormat == 24) {
          if (meridian.trim() == "AM") {
            if (hours == "12") {
              hours = "00";
            }
          }
        }

        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        setMeridian(meridian);
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

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    time = time.join(""); // return adjusted time or original string
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\s[AP]M)$/;

    const match = time.match(timeRegex);

    if (match) {
      let hours = match[1];
      const minutes = match[2];
      const seconds = match[3];
      const meridian = match[4];

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      setMeridian(meridian);
    }
  }

  function changeTimeFormat() {
    if (timeFormat == 24) {
      setTimeFormat(12);
    } else {
      setTimeFormat(24);
    }
  }

  return (
    <div className="Clock">
      <div className="time">
        <p>{hours}</p>:<p>{minutes}</p>
        <div>
          <p className="seconds">{seconds}</p>
          {timeFormat != 24 && <p className="seconds">{meridian}</p>}
        </div>
      </div>
      <div className="date">
        {day} - {month} {date}
      </div>
      {/* <button
        onClick={() => {
          changeTimeFormat();
        }}
      >
        Change
      </button> */}
    </div>
  );
};

export default Clock;
