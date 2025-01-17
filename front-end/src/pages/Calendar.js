import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import frLocale from "date-fns/locale/fr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const initialEvents = [
  {
    title: "Rendez-vous avec le maire",
    start: new Date(2023, 11, 25, 14, 0),
    end: new Date(2023, 11, 25, 15, 0),
    allDay: false,
  },
];

function Calendar() {
  const [myEvents, setMyEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
  });

  const handleInputChange = (field, value) => {
    setNewEvent({ ...newEvent, [field]: value });
  };

  const handleSelectSlot = (slotInfo) => {
    // Pré-remplit les dates dans le formulaire
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    setMyEvents([...myEvents, newEvent]);
    setNewEvent({
      title: "",
      start: null,
      end: null,
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Calendrier</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Titre de l'événement</label>
          <input
            type="text"
            className="form-control"
            value={newEvent.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Entrez un titre"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date et heure de début</label>
          <DatePicker
            className="form-control"
            selected={newEvent.start}
            onChange={(date) => handleInputChange("start", date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Sélectionnez une date"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date et heure de fin</label>
          <DatePicker
            className="form-control"
            selected={newEvent.end}
            onChange={(date) => handleInputChange("end", date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Sélectionnez une date"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter un événement
        </button>
      </form>
      <BigCalendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot} // Gère les clics sur le calendrier
        style={{ height: 500 }}
        culture="fr"
      />
    </div>
  );
}

export default Calendar;