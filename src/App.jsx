import React, { useState, useContext, useEffect } from "react";

import Header from "@/components/Header.jsx";
import Month from "@/components/Month";
import AppContext from "@/store/AppContext.js";
import EventModal from "@/components/EventModal";

import { getMonth } from "./helpers/index.js";

function App() {
    const [selectedMonth, setSelectedMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(AppContext);

    useEffect(() => {
        setSelectedMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <>
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <Header />
                <div className="flex flex-1">
                    <Month month={selectedMonth} />
                </div>
            </div>
        </>
    );
}

export default App;
