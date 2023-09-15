import { useState } from 'react';
import Navbar from './Navbar'
import Calendar from './Calendar.js';
import TimeGrid from './TimeGrid.js';
import TutorsList from './List.js';
import { startOfWeek, endOfWeek } from 'date-fns';
import Typography from '@mui/material/Typography';

function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function Reserve(){
  const today = new Date();
  const [viewRange, setViewRange] = useState(getWeekDays(today));
  const [selected, setSelected] = useState(false)
  const [selectedRange, setSelectedRange] = useState({from: today, to: today});
  
  return(
    <div>
      <Navbar/>
      <div className='container'>
        <div className='calendar'>
          <Calendar 
            viewRange={viewRange}
            setViewRange={setViewRange} 
            selectedRange={selectedRange} 
            setSelectedRange={setSelectedRange}
          />
        </div>
        
        <div className='timegrid'>
          <TimeGrid
            viewRange={viewRange}
            setViewRange={setViewRange}
            setSelected={setSelected}
            selectedRange={selectedRange} 
            setSelectedRange={setSelectedRange}      
          />
        </div>
        
        <div className='list'>
          {
            selected
            ? <TutorsList
              viewRange={viewRange}
              setViewRange={setViewRange} 
              selectedRange={selectedRange} 
              setSelectedRange={setSelectedRange}
            />
            :
            <div style={{textAlign: 'center'}}>
              <Typography variant='body2' sx={{mt: 1.5}}>캘린더에서 원하시는 시간을 눌러 수업을 신청해 주세요.</Typography>
            </div>
          }
        </div>
      </div>
    </div>
  ) 
}