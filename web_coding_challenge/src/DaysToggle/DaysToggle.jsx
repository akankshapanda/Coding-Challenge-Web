import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { EventCard } from '../eventcard/EventCard.jsx';
import { Grid, Paper } from '@material-ui/core'


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div>
      {value === index && (
        <Typography>{children}</Typography>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    margin: 20,
    width: 'max-content',
  },
}));

export default function DaysToggle(props) {
  const { events } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [ selectedTab, setSelectedTab ] = useState(0);
  const [ uniqueDays, setUniqueDays ] = useState(new Set());

  useEffect(() => {
    const uniqueDaysSet = new Set(
        events
            .map(event => getFormattedDate(event.startTime))
            .sort((a, b) =>
              a.localeCompare(b, undefined, {
                numeric: true,
                sensitivity: 'base'
              }))
    );

    setUniqueDays(uniqueDaysSet);
  }, [ events ])

  const getFormattedDate = epochSeconds => {
    const newTime = new Date(epochSeconds * 1000);
    return newTime.toLocaleString('default', { month: 'long', day: 'numeric' });
  }

  const getTabs = () => (
   Array.from(uniqueDays.keys())
       .sort((a, b) =>
           a.localeCompare(b, undefined, {
           numeric: true,
           sensitivity: 'base'
         })
       )
       .map(uniqueDay => (
      <Tab label={uniqueDay}/>
    ))
  );

  const getEventCards = date => {
    return events
      .filter(event => getFormattedDate(event.startTime) === date)
      .map(event => (
        <EventCard
        key={event.id}
        event={event}
      />))
  }

  const getPanelView = () => (
    Array.from(uniqueDays.keys()).map((uniqueDay, index) => (
        <TabPanel value={selectedTab} index={index}>
          {getEventCards(uniqueDay)}
        </TabPanel>
    ))
  );

  return (
    <Grid container>
      <Grid item xs={2}>
        <Tabs
            orientation="vertical"
            variant="fullWidth"
            value={selectedTab}
            onChange={(e, selectedTab) => setSelectedTab(selectedTab)}
        >
            {getTabs(uniqueDays)}
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <SwipeableViews
          axis={'x'}
          index={selectedTab}
          onChangeIndex={setSelectedTab}
        >
          {getPanelView()}
        </SwipeableViews>
      </Grid>
    </Grid>
  );
}
