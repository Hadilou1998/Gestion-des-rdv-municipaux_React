import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import fr from 'date-fns/locale/fr';

const locales = { fr };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: 'Rendez-vous passeport',
        start: new Date(2024, 0, 10, 10, 0),
        end: new Date(2024, 0, 10, 11, 0),
    },
    {
        title: 'Rendez-vous carte d’identité',
        start: new Date(2024, 0, 15, 14, 0),
        end: new Date(2024, 0, 15, 15, 0),
    },
];

function CalendarPage() {
    const [myEvents] = useState(events);

    return (
        <div className="container mt-5">
            <h1>Calendrier</h1>
            <div className="mt-4">
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </div>
    );
};

export default CalendarPage;