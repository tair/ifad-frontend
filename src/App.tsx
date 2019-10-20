import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { useRouteMatch, Route } from 'react-router-dom';
import { WGS } from './components/WGS/WGS';

const withStyles = makeStyles((_theme: Theme) => ({
    root: {
        height: "100%"
    }
}))



export const App = () => {
    const classes = withStyles({});

    return (
        <div className={classes.root}>
            <Route path={`/snapshot`} component={WGS}/>
        </div>
    )
}
