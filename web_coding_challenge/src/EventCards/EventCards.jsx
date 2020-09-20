//Comment here
import React from 'react';
import { Grid, Card, Paper } from '@material-ui/core'

export const EventCards = (props) => {
  return (
    <Paper elevation={3}>
      <Card>
        <Grid item container direction='row'>
          <Grid item container direction='column' xs={1}>
          </Grid>
          <Grid item container direction='column' xs={1}>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
}
