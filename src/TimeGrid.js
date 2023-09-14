import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import './App.css';

export default function TimeGrid(){ 
  const today = new Date()
  let rangeStart = '2023-09-10';
  let rangeEnd = '2023-09-17';
  
  function selectAllow(selectInfo){
    return today < selectInfo.start && today < selectInfo.end
  }
  
  function handleSelect(info){
    alert('selected ' + info.startStr + ' to ' + info.endStr);
  }
  
  return (
    <div>
      <FullCalendar
        plugins={[ interactionPlugin, timeGridPlugin ]}
        initialView='timeGrid'
        headerToolbar={{
          right: ''
        }}
        allDaySlot={false}
        visibleRange={{
          start: rangeStart, 
          end: rangeEnd
        }}
        validRange={{ 
          start: today 
        }}
        slotDuration={'1:00:00'}
        snapDuration={'1:00:00'} // change to 30 min
        selectable={true}
        selectOverlap={false}
        selectAllow={selectAllow}
        select={handleSelect}
      />
    </div>
  )
}