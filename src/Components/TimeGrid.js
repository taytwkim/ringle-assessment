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
import { useSelector } from 'react-redux'


function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function TimeGrid(props){ 
  const today = useMemo(() => new Date(), []); // today's date
  const [isThisWeek, setIsThisWeek] = useState(props.viewRange.from <= today && today <= props.viewRange.to) //if the displayed week is the current week
  const [events, setEvents] = useState([{
    id: '1',
    title: 'Existing Event',
    start: '2023-09-16T10:00:00',
    end: '2023-09-16T12:00:00',
  }])

  const count = useSelector((state) => state.user.num_lessons_20)

  useEffect(()=>{
		setIsThisWeek(props.viewRange.from <= today && today <= props.viewRange.to)
	}, [props.viewRange.from, props.viewRange.to, today]);

  //disable select past dates
  function selectAllow(selectInfo){
    return today < selectInfo.start && today < selectInfo.end
  }
  
  function handleSelect(info){
    props.setSelected(true)
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
      <p>hello {count}</p>
      
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
        events={events}
      />
    </div>
  )
}