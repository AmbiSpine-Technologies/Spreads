import React, { useState } from 'react';
import { TbCalendarStats, TbCalendarMonth } from 'react-icons/tb';

const TimeSchedule = () => {
  // State for the selected date and time
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedMonth, setSelectedMonth] = useState(8); // 1-based index
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedHour, setSelectedHour] = useState(18); // 6 PM
  const [selectedMinute, setSelectedMinute] = useState(42);

  // Generate options for day, month, year, hour, and minute
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => 2024 + i);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Handle change in the date input field
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1); // JS months are 0-indexed
    setSelectedDay(date.getDate());
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content" style={{ width: "500px" }}>
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 className="modal-title">Schedule</h5>
          <button className="btn btn-dark rounded-4 btn-sm">Confirm</button>
        </div>
        <div className="modal-body">
          <span className="text-secondary text-small">
            <TbCalendarStats size={15} className="me-3" /> Will send on Fri, Aug 2, 2024 at 6:42 PM
          </span>
          <p className="text-secondary mt-1 fw-normal mb-0">Date</p>
          <div className="d-flex gap-2">
            <div className="d-flex gap-3">
              <div className="border rounded-2 p-2" style={{ width: "200px" }}>
                <span className="text-small d-block">Month</span>
                <select
                  style={{ border: "none", outline: "none" }}
                  className="w-100 fs-6"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="border rounded-2 p-2" style={{ width: "100px" }}>
                <span className="text-small d-block">Day</span>
                <select
                  style={{ border: "none", outline: "none" }}
                  className="w-100 fs-6"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                >
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="border rounded-2 p-2" style={{ width: "100px" }}>
                <span className="text-small d-block">Year</span>
                <select
                  style={{ border: "none", outline: "none" }}
                  className="w-100 text-normal"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label>
                <TbCalendarMonth size={25} />
                <input
                  type="date"
                  className="d-none"
                  value={`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`}
                  onChange={handleDateChange}
                />
              </label>
            </div>
          </div>
          
          <div className="">
          <p className="text-secondary mt-1 fw-normal mb-0">Time</p>
            <div className="d-flex gap-3">
              <div className="border rounded-2 p-1" style={{ width: "150px" }}>
                <span className="text-small d-block">Hour</span>
                <select
                  style={{ border: "none", outline: "none" }}
                  className="w-100 fs-6"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(Number(e.target.value))}
                >
                  {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="border rounded-2 p-1" style={{ width: "150px" }}>
                <span className="text-small d-block">Minute</span>
                <select
                  style={{ border: "none", outline: "none" }}
                  className="w-100 fs-6"
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(Number(e.target.value))}
                >
                  {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-2 gap-0">
            <p className='mb-0'style={{fontSize:"0.8rem"}} >Time zone</p>
            <h5>India Standard Time</h5>
          </div>
        </div>
        <div className="modal-footer text-left">
          <a href="" className='float-start'>Schedule posts</a>
        </div>
      </div>
    </div>
  );
};

export default TimeSchedule;
