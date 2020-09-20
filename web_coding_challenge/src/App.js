import React from 'react';
import './App.css';
import { EventCards } from './EventCards/EventCards.jsx'

export const App = (props) => {
  return(
    <div>
      Hello from the other side!
      <EventCards/>
    </div>
  );
}
