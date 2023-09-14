import Calendar from './Calendar.js';
import TimeGrid from './TimeGrid.js';
import List from './List.js';

export default function Reserve(){
  return(
    <div className='container'>
      <div className='calendar'><Calendar/></div>
      <div className='timegrid'><TimeGrid/></div>
      <div><List/></div>
    </div>
  )
}