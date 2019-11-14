import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { useRouteMatch, Route, Redirect, Switch } from 'react-router-dom';
import { WGS } from './components/WGS/WGS';
import { FetchProvider } from "@bjornagh/use-fetch";

const withStyles = makeStyles((_theme: Theme) => ({
    root: {
        height: "100%"
    }
}))

const cache = new Map();

export const App = () => {
    const classes = withStyles({});

    return (
        <FetchProvider cache={cache}>
            <div className={classes.root}>
                <Switch>
                    <Route path={`/snapshot`} component={WGS}/>
                    <Redirect exact strict from="/" to="/snapshot/"/>
                </Switch>
            </div>
        </FetchProvider>
    )
}
