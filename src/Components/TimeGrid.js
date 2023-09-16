import { useState, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux'
import koLocale from 'date-fns/locale/ko';
import { format } from 'date-fns';
import '../App.css';
import { increment20, deleteReserved, increment40 } from '../app/userSlice';

// Return the start and end dates of the week
function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function TimeGrid(props){ 
  const reservedLessons = useSelector((state) => state.user.reservedLessons);

  const today = useMemo(() => new Date(), []);
  const [isThisWeek, setIsThisWeek] = useState(props.viewRange.from <= today && today <= props.viewRange.to); //if the displayed week is the current week
  
  const [openModal, setOpenModal] = useState(false);
  const [clickedEvent, setClickedEvent] = useState();

  useEffect(()=>{
		setIsThisWeek(props.viewRange.from <= today && today <= props.viewRange.to)
	}, [props.viewRange.from, props.viewRange.to, today]);

  // disable select past dates
  function selectAllow(selectInfo){
    return today < selectInfo.start && today < selectInfo.end
  }
  
  function handleSelect(info){
    const startTime = new Date(info.startStr);
    const endTime = new Date(info.endStr);

    props.setSelected(true)
    props.setSelectedRange({
      from: startTime,
      to: endTime
    })
  }
  
  function handleEventClick(info){
    setClickedEvent(info.event)
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
      <BasicModal clickedEvent={clickedEvent} openModal={openModal} setOpenModal={setOpenModal}/>

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
        scrollTimeReset={false}
        validRange={{ 
          start: today 
        }}
        slotDuration={'0:30:00'}
        snapDuration={'1:00:00'} // change to 30 min
        selectable={true}
        selectOverlap={false}
        selectAllow={selectAllow}
        select={handleSelect}
        events={reservedLessons}
        displayEventEnd={false}s
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
  const dispatch = useDispatch()

  return(
    <div>
    <Modal
      open={props.openModal}
      onClose={()=>{props.setOpenModal(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        { 
          props.openModal
          ? <> 
            <Typography id="modal-modal-description" sx={{mb: 1}}>
              {format(props.clickedEvent.start, 'PPP EEE p', { locale: koLocale })}
            </Typography>
            <Typography id="modal-modal-description" sx={{mb: 1}}>
              {props.clickedEvent.extendedProps.tutorName}
            </Typography>
          </>
          : <></>
        }
        <Typography id="modal-modal-description" sx={{mb: 2}}>
          이 수업을 삭제하시겠습니까?
        </Typography>
        
        <Stack spacing={2} direction="row" justifyContent="flex-end">
          <Button variant="outlined" onClick={()=>{
            props.setOpenModal(false)
          }}>
            취소
          </Button>
          <Button variant="outlined" color='error' onClick={()=>{
            if(props.clickedEvent.extendedProps.eventType === 20){
              dispatch(increment20())
            }
            else if (props.clickedEvent.extendedProps.eventType === 40){
              dispatch(increment40())
            }
            dispatch(deleteReserved(props.clickedEvent.extendedProps.eventID))
            props.setOpenModal(false)
          }}>
            삭제
          </Button>
        </Stack>
      </Box>
    </Modal>
  </div>
  )
}