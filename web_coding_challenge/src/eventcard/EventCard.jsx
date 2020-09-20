//Comment here
import React, {useState} from 'react';
import { Grid, Card, Paper, makeStyles, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import ShareIcon from '@material-ui/icons/Share';
import EventIcon from '@material-ui/icons/Event';

export const EventCard = props => {
  const {
    event: {
      id,
      name,
      description,
      startTime,
      endTime,
    }
  } = props;

  const useStyles = makeStyles({
    times: {
      display: 'flex',
      padding: 14,
      alignContent: 'center',
      backgroundColor: '#7FFFD4',
      justifyContent: 'center',
    },
    content: {
      padding: 24,
      alignContent: 'center',
    },
    entireCard: {
      display: 'flex',
      flexWrap: 'wrap-content',
      justifyContent: 'flex-start',
      alignContent: 'space-evenly',
      borderRadius: 20,
      marginBottom: 10,
    }
  });

  const classes = useStyles();

  const getFormattedTime = epochSeconds => {
    const newTime = new Date(epochSeconds * 1000);
    return newTime.toLocaleString('default', { hour: '2-digit', minute: '2-digit' });
  }


  return (
        <Card className={classes.entireCard} raised={true}>
          <Grid item container direction='row' spacing={0}>
            <Grid item direction='column' xs={2} className={classes.times}>
              {getFormattedTime(startTime)}
            </Grid>
            <Grid item container direction='column' xs={10} className={classes.content}>
              <Grid item direction='row'><h3>{name}</h3> {description} </Grid>
              <IconFunctionality/>
            </Grid>
          </Grid>
        </Card>
  );
};

export const IconFunctionality = (props) => {
  const [fav, setFav] = useState(false);
  const useStyles = makeStyles({
    icons: {
      paddingButton: 16,
      justifyContent: 'flex-end',
    },

  });
  const classes = useStyles();

  const handleClickFav = () => {
    setFav(!fav);
  }

  return (
    <Grid item container direction='row' className={classes.icons}>
      <IconButton><EventIcon color='primary' className={classes.icon}/></IconButton>
      <IconButton><ShareIcon color='inherit' className={classes.icon}/></IconButton>
      {fav && <IconButton onClick = {handleClickFav} color='secondary'><FavoriteIcon className={classes.icon}/></IconButton> }
      {!fav && <IconButton onClick = {handleClickFav} color='secondary'><FavoriteTwoToneIcon className={classes.icon}/></IconButton>}
    </Grid>
  );
}
