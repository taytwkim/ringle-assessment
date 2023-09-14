import { useState } from 'react';
import Navbar from './Navbar'
import Calendar from './Calendar.js';
import TimeGrid from './TimeGrid.js';
import List from './List.js';
import { startOfWeek, endOfWeek } from 'date-fns';

function getWeekDays(date){
  return {
    from: startOfWeek(date),
    to: endOfWeek(date)
  }
}

export default function Reserve(){
  const today = new Date();
  const [viewRange, setViewRange] = useState(getWeekDays(today));
  const [selectedRange, setSelectedRange] = useState();

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
            selectedRange={selectedRange} 
            setSelectedRange={setSelectedRange}      
          />
        </div>
        
        <div className='list'>
          <List/>
        </div>
      </div>
    </div>
  ) 
}