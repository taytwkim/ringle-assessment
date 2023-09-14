import React from 'react';
import { useState, useEffect } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { ko } from "date-fns/locale";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function Calendar(props) {
  const today = new Date();
  const [month, setMonth] = useState(today);

  useEffect(()=>{
		setMonth(props.viewRange.from)
	}, [props.viewRange]);

  function handleDayChange(date){
    props.setViewRange(getWeekDays(date));
  }
  
  // let footer = <p>Please pick the start date.</p>;

  /*
  if (props.viewRange?.from) {
    if (!props.viewRange.to) {
      footer = <p>{format(props.viewRange.from, 'PPP')}</p>;
    } else if (props.viewRange.to) {
      footer = (
        <p>
          {format(props.viewRange.from, 'PPP')}–{format(props.viewRange.to, 'PPP')}
        </p>
      );
    }
  }
  */

  return (
    <DayPicker
      id="test"
      showOutsideDays
      locale={ko}
      fromDate={today}
      month={month}
      onMonthChange={setMonth}
      mode="range"
      selected={props.viewRange}
      onDayClick={handleDayChange}
      // footer={footer}
    />
  );
}