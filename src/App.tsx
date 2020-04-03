import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Route, Redirect, Switch } from 'react-router-dom';
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
            <Switch>
                <Route path={`/snapshot`} component={WGS}/>
                <Redirect exact strict from="/" to="/snapshot/"/>
            </Switch>
        </div>
    )
}
