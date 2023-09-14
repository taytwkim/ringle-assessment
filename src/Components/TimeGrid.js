import { useState, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import '../App.css';

function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function TimeGrid(props){ 
  const today = useMemo(() => new Date(), []);
  const [isThisWeek, setIsThisWeek] = useState(props.viewRange.from <= today && today <= props.viewRange.to)

  useEffect(()=>{
		setIsThisWeek(props.viewRange.from <= today && today <= props.viewRange.to)
	}, [props.viewRange.from, props.viewRange.to, today]);

  function selectAllow(selectInfo){
    return today < selectInfo.start && today < selectInfo.end
  }
  
  function handleSelect(info){
    props.setSelectedRange({
      from: new Date(info.startStr),
      to: new Date(info.endStr)
    })
  }
  
  const handlePrevButton = (event) => {
    props.setViewRange(getWeekDays(addDays(props.viewRange.from, -7)));
  };

  const handleTodayButton = (event) => {
    props.setViewRange(getWeekDays(today));
  };

  const handleNextButton = (event) => {
    props.setViewRange(getWeekDays(addDays(props.viewRange.from, 7)));
  };
  
  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={handlePrevButton} disabled={isThisWeek}><ArrowBackIosNewIcon/></Button>
        <Button onClick={handleTodayButton}>오늘</Button>
        <Button onClick={handleNextButton}><ArrowForwardIosIcon/></Button>
      </ButtonGroup>
      
      <FullCalendar
        plugins={[ interactionPlugin, timeGridPlugin ]}
        initialView='timeGrid'
        headerToolbar={{
          left: '',
          right: ''
        }}
        locale={'ko'}
        allDaySlot={false}
        visibleRange={{
          start: props.viewRange.from, 
          end: props.viewRange.to
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