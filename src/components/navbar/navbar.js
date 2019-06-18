import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});


export default function SimpleAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar style={{ backgroundColor: '#072e41' }} position="static">
                <Toolbar>
                    <Typography style={{ color: 'white',fontSize: '1.75rem'}} variant="h5">
                            Food App
          </Typography>
        </Toolbar>
      </AppBar>
    </div >
  );
}