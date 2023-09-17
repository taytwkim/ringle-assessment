import { createSlice } from '@reduxjs/toolkit'

/*
  {
    "tutorID": "T0004",
    "name": "Tim",
    "school": "Dartmouth College",
    "majorType": 3,
    "major": "Computer Science",
    "gender": 2,
    "accent": 1,
    "acceptanceRate": 100,
    "reservedLessons": [],
    "available": [{
      "start": "2023-09-19T21:50:00.000Z",
      "end": "2023-09-20T14:59:59.000Z"
    }]
  }
*/

const tutorInitialState = require("../TutorInfo.json");

export const tutorSlice = createSlice({
  name: 'tutor',
  initialState: tutorInitialState,
  reducers: {
    tutorAddReserved: (state, action) => {
      const i = action.payload.tutorIndex;
      console.log("Tutor Action: Add Event " + action.payload.event.eventID + " to tutor " + state[i].tutorID);
      
      // console.log("Before Action: " + state[i].reservedLessons.length.toString());
      state[i].reservedLessons.push(action.payload.event);
      // console.log("After Action: " + state[i].reservedLessons.length.toString());
      
      /* Update available time 
       * Find appropriate time range, and splice the range to account for the newly added event
       */
      if(state[i].available.length > 0){
        console.log("Tutor Action: Update Available Time");
        // console.log("Before Update: " + JSON.stringify(state[i].available) + " for tutor " + state[i].tutorID);
        
        const eventStart = new Date(action.payload.event.start);
        const eventEnd = new Date(action.payload.event.end);
        
        for (let j=0; j < state[i].available.length; j++){
          const availableStart = new Date(state[i].available[j].start);
          const availableEnd = new Date(state[i].available[j].end);

          if (availableStart <= eventStart && eventEnd <= availableEnd){
            state[i].available.splice(j+1, 0, {start: eventEnd.toISOString(), end: availableEnd.toISOString()});
            state[i].available.splice(j+1, 0, {start: availableStart.toISOString(), end: eventStart.toISOString()});
            state[i].available.splice(j, 1);
            break;
          }
        }
        // console.log("After Update: " + JSON.stringify(state[i]));
      }
    },
    tutorDeleteReserved: (state, action) => {
      console.log("Tutor Action: Delete Event " + action.payload.eventID + " from tutor " + action.payload.tutorID);
      
      let tutorIndex = 0
      for (let i = 0; i < state.length; i++) {
        if (state[i].tutorID === action.payload.tutorID) {
          tutorIndex = i;
          break;
        }
      }
      
      // console.log("Before Action: " + state[tutorIndex].reservedLessons.length.toString());
      state[tutorIndex].reservedLessons = state[tutorIndex].reservedLessons.filter((lesson, i) => lesson.eventID !== action.payload.eventID);
      // console.log("After Action: " + state[tutorIndex].reservedLessons.length.toString());
      
      /* Update available time 
       * Since an event has been deleted, set the corresponding time range as available.
       */
      if(state[tutorIndex].available.length > 0){
        console.log("Tutor Action: Update Available Time for tutor " + state[tutorIndex].tutorID);
        // console.log("Before Update: " + JSON.stringify(state[tutorIndex].available));
        
        const eventStart = new Date(action.payload.eventStart);
        const eventEnd = new Date(action.payload.eventEnd);
        
        let start = eventStart;
        let end = eventEnd;
        const updated = [];

        for(let j = 0; j < state[tutorIndex].available.length; j++){
          const availableStart = new Date(state[tutorIndex].available[j].start);
          const availableEnd = new Date(state[tutorIndex].available[j].end);

          if (availableEnd.getTime() === eventStart.getTime()){
            start = availableStart;
          }
          else if (eventEnd.getTime() === availableStart.getTime()){
            end = availableEnd;
          }
          else{
            updated.push(state[tutorIndex].available[j])
          }
        }

        updated.push({start: start.toISOString(), end: end.toISOString()});
        state[tutorIndex].available = updated;
        
        // console.log("After Update: " + JSON.stringify(state[tutorIndex]));
      }
    }
  },
})

export const { tutorAddReserved, tutorDeleteReserved } = tutorSlice.actions

export default tutorSlice.reducer