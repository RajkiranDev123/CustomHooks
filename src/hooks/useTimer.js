import { useEffect, useRef, useState } from "react";

const useTimer = (initialSeconds = 0, isCountdown = false) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
// component is getting re-rendered each time your state changes, so you benefit from keeping your interval reference as a ref from useRef.
  useEffect(() => {
    if (isActive) {
      console.log(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (isCountdown && prevSeconds <= 0) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return isCountdown ? prevSeconds - 1 : prevSeconds + 1;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isCountdown]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => {setIsActive(false);setSeconds(initialSeconds);};

            return { seconds, start, stop, reset, isActive };
};

export default useTimer;

//To appreciate why useRef doesn't trigger re-renders, we must delve into React's
// rendering mechanism and its reliance on immutability. React operates on the principle that when it detects changes
// in a component's state or props, it re-renders that component.

//However, the useRef object's current property can be modified without triggering a re-render.