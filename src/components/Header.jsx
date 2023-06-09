import dayjs from "dayjs";
import React, { useContext } from "react";
import AppContext from "../store/AppContext.js";

export default function Header() {
  const { monthIndex, setMonthIndex } = useContext(AppContext);
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }
  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500">
        Calendar Reminder App
      </h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span>
          Left
        </span>
      </button>
      <button className="ml-4" onClick={handleNextMonth}>
        <span>
          Right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
