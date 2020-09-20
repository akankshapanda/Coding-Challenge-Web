import React, { useState, useEffect } from 'react';
import './App.css';
import { EventCard } from './eventcard/EventCard.jsx';
import DaysToggle from './DaysToggle/DaysToggle.jsx';
import axios from 'axios';
import { Grid } from '@material-ui/core'

export const App = (props) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get('https://api.hackillinois.org/event/')
      .then(res => {
        setEvents(res.data.events.map(event => event));
      })
      .catch(err => {

      })
      .finally(() => {

      });
  }, []);

  const changeTime = (unix_time) => {
    const newTime = new Date(unix_time * 1000);
    const monthArray = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
    const time = [monthArray[newTime.getMonth()], newTime.getFullYear(), newTime.getDate()
    , newTime.getHours(), newTime.getMinutes()];
    return time;
  }

  const getNames = () => {
    return events.map(event => (
      <EventCard key={event.id + event.startTime} title={event.name} content={event.description} startTime={changeTime(event.startTime)} endTime={changeTime(event.endTime)} />
    ));
  }

  return(
    <div>
      <Grid item container direction="row">
        <Grid item direction="column" xs={9}>
          <DaysToggle
            events = {events}
            getEventCards = {getNames()}
            changeTime = {changeTime()}
          />
        </Grid>
        <Grid item direction="column" xs={3}>
        </Grid>
      </Grid>
    </div>
  );
}
