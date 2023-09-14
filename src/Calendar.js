import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { ko } from "date-fns/locale";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function Calendar() {
  const today = new Date();
  const defaultSelected = getWeekDays(today);
  const [range, setRange] = useState(defaultSelected);

  function handleDayChange(date){
    setRange(getWeekDays(date));
  }
  
  let footer = <p>Please pick the start date.</p>;

  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  return (
    <DayPicker
      id="test"
      showOutsideDays
      locale={ko}
      fromDate={today}
      mode="range"
      selected={range}
      onDayClick={handleDayChange}
      footer={footer}
    />
  );
}