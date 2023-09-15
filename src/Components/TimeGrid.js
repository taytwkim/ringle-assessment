import { useState, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import { useSelector } from 'react-redux'
import '../App.css';

// Return the start and end dates of the week
function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

// Return a list of FullCalendar events
function getEvents(reservedLessons){
  let events = []
  
  for (let i = 0; i < reservedLessons.length; i++) {
    events.push({
      id: reservedLessons[i].eventID,
      title: "예약 완료",
      start: reservedLessons[i].start,
      end: reservedLessons[i].end
    })
  }
  return events
}

export default function TimeGrid(props){ 
  const reservedLessons = useSelector((state) => state.user.reservedLessons)

  const today = useMemo(() => new Date(), []);
  const [isThisWeek, setIsThisWeek] = useState(props.viewRange.from <= today && today <= props.viewRange.to) //if the displayed week is the current week
  
  const [openModal, setOpenModal] = useState(false);
  const [clickedEventID, setClickedEventID] = useState();

  useEffect(()=>{
		setIsThisWeek(props.viewRange.from <= today && today <= props.viewRange.to)
	}, [props.viewRange.from, props.viewRange.to, today]);

  // disable select past dates
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
  
  function handleEventClick(info){
    console.log(info.event)
    setClickedEventID(info.event.id)
    setOpenModal(true)
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
      <BasicModal clickedEventID={clickedEventID} openModal={openModal} setOpenModal={setOpenModal}/>

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
        events={getEvents(reservedLessons)}
        displayEventEnd={false}
        eventClick={handleEventClick}
      />
    </div>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function BasicModal(props){
  const reservedLessons = useSelector((state) => state.user.reservedLessons)

  return(
    <div>
    <Modal
      open={props.openModal}
      onClose={()=>{props.setOpenModal(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-description">
          이 수업을 삭제하시겠습니까?
        </Typography>
      </Box>
    </Modal>
  </div>
  )
}