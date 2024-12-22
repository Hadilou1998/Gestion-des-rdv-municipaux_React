import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import frLocale from "date-fns/locale/fr";

const locales = {
  fr: frLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Rendez-vous avec le maire",
    start: new Date(2023, 11, 25, 14, 0),
    end: new Date(2023, 11, 25, 15, 0),
    allDay: false,
  },
];

function Calendar() {
  const [myEvents] = useState(events);

  return (
    <div className="container my-5">
      <h2 className="text-center">Calendrier</h2>
      <BigCalendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        culture="fr"
      />
    </div>
  );
}

export default Calendar;