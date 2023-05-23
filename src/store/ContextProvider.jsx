import React, { useState, useEffect, useReducer, useMemo } from "react";
import AppContext from "./AppContext.js";
import dayjs from "dayjs";

function eventReducer(state, { type, payload }) {
    switch (type) {
        case "add":
            return [...state, payload];
        case "update":
            return state.map((event) => (event.id === payload.id ? payload : event));
        case "delete":
            return state.filter((event) => event.id !== payload.id);
    }
}

function initializeEvents() {
    const storedEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
    return parsedEvents;
}

export default function ContextProvider(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
        eventReducer,
        [],
        initializeEvents
    );

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((event) =>
            labels
                .filter((label) => label.checked)
                .map((label) => label.label)
                .includes(event.label)
        );
    }, [savedEvents, labels]);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        setLabels((previousLabels) => {
            return [...new Set(savedEvents.map((event) => event.label))].map(
                (label) => {
                    const currentLabel = previousLabels.find(
                        (prevLabel) => prevLabel.label === label
                    );
                    return {
                        label,
                        checked: currentLabel ? currentLabel.checked : true,
                    };
                }
            );
        });
    }, [savedEvents]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    function updateLabel(label) {
        setLabels(
            labels.map((lbl) => (lbl.label === label.label ? label : lbl))
        );
    }

    return (
        <AppContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                selectedEvent,
                setSelectedEvent,
                savedEvents,
                setLabels,
                labels,
                updateLabel,
                filteredEvents,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
