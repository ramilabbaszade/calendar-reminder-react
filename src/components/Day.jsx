import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../store/AppContext.js";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(AppContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-green-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center  ">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 w-full bg-blue-500 text-center text-white">
            {day.format("dddd").toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer bg-slate-50"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
          {dayEvents.map((evt, idx) => {
                  return <div
                      key={idx}
                      onClick={() => setSelectedEvent(evt)}
                      className={`bg-${evt.label}-500 p-1 mr-3 text-gray-500 text-sm rounded mb-1 truncate text-white`}
                  >
                      {evt.title}
                  </div>
              }
          )}
      </div>
    </div>
  );
}
