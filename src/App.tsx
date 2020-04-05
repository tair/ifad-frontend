import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { WGS } from './components/WGS/WGS';
import {FetchProvider} from "@bjornagh/use-fetch";

const cache = new Map();

export const App = () => {
    return (
        <FetchProvider cache={cache}>
            <Switch>
                <Route path={`/snapshot`} component={WGS} />
                <Redirect exact strict from="/" to="/snapshot/" />
            </Switch>
        </FetchProvider>
    )
}
