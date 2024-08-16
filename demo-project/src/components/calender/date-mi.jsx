import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function CalendarComponent() {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
      
      <DemoItem label="Controlled calendar">
        <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
      </DemoItem>
    </DemoContainer>
  </LocalizationProvider>
  )
}

export default CalendarComponent