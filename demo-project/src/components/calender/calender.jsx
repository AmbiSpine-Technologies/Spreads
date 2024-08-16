import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, addYears, subYears } from 'date-fns';
import './calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [events, setEvents] = useState({});

  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth();
  const selectedDayNumber = selectedDay.getDate();

  const years = Array.from({ length: 10 }, (_, i) => ({
    value: new Date().getFullYear() - 5 + i,
    label: new Date().getFullYear() - 5 + i,
  }));

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(selectedYear, i), 'MMMM'),
  }));

  const start = startOfMonth(currentDate);
  const end = endOfMonth(start);
  const daysInMonth = eachDayOfInterval({ start, end }).map(day => ({
    value: day.getDate(),
    label: day.getDate(),
  }));

  const handleYearChange = (selectedOption) => {
    const newDate = new Date(selectedOption.value, selectedMonth, selectedDayNumber);
    setCurrentDate(newDate);
    setSelectedDay(newDate);
  };

  const handleMonthChange = (selectedOption) => {
    const newDate = new Date(selectedYear, selectedOption.value, selectedDayNumber);
    setCurrentDate(newDate);
    setSelectedDay(newDate);
  };

  const handleDayChange = (selectedOption) => {
    const newDate = new Date(selectedYear, selectedMonth, selectedOption.value);
    setCurrentDate(newDate);
    setSelectedDay(newDate);
  };

  const handleAddEvent = () => {
    const eventText = prompt('Enter event details:');
    if (eventText && selectedDay) {
      const dayKey = format(selectedDay, 'yyyy-MM-dd');
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dayKey]: [...(prevEvents[dayKey] || []), eventText],
      }));
    }
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDay(new Date(newDate.getFullYear(), newDate.getMonth(), selectedDayNumber));
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDay(new Date(newDate.getFullYear(), newDate.getMonth(), selectedDayNumber));
  };

  const handleNextYear = () => {
    const newDate = addYears(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDay(new Date(newDate.getFullYear(), newDate.getMonth(), selectedDayNumber));
  };

  const handlePrevYear = () => {
    const newDate = subYears(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDay(new Date(newDate.getFullYear(), newDate.getMonth(), selectedDayNumber));
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevYear}>⬅️</button>
          <Select
            className="year-select"
            value={{ value: selectedYear, label: selectedYear }}
            onChange={handleYearChange}
            options={years}
          />
          <button onClick={handleNextYear}>➡️</button>
          <button onClick={handlePrevMonth}>⬅️</button>
          <Select
            className="month-select"
            value={{ value: selectedMonth, label: format(new Date(selectedYear, selectedMonth), 'MMMM') }}
            onChange={handleMonthChange}
            options={months}
          />
          <button onClick={handleNextMonth}>➡️</button>
          <Select
            className="day-select"
            value={{ value: selectedDayNumber, label: selectedDayNumber }}
            onChange={handleDayChange}
            options={daysInMonth}
          />
        </div>
        <div className="calendar-body">
          {daysInMonth.map((day) => (
            <div
              key={day.value}
              className={`calendar-day ${selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(new Date(selectedYear, selectedMonth, day.value), 'yyyy-MM-dd') ? 'selected' : ''}`}
              onClick={() => handleDayChange(day)}
            >
              {day.label}
            </div>
          ))}
        </div>
      </div>
      <div className="event-panel">
        <h2>Events on {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'Select a day'}</h2>
        {selectedDay && (
          <>
            <button onClick={handleAddEvent}>Add Event</button>
            <ul>
              {(events[format(selectedDay, 'yyyy-MM-dd')] || []).map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
