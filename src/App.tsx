import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { WGS } from './components/WGS/WGS';
import { WGC } from './components/WGC/WGC';
import { custom } from './components/WGC/custom';
import { goMapper } from './components/WGS/goMapper';
import { funcPie } from "./components/WGC/funcPie";
import { funcBar } from "./components/WGC/funcBar";
import {FetchProvider} from "@bjornagh/use-fetch";

const cache = new Map();

export const App = () => {
    return (
        <FetchProvider cache={cache}>
            <Switch>
                <Route path={`/snapshot`} component={WGS} />
                <Route path={`/functional`} component={WGC} />
                <Route path={`/custom`} component={custom} />
                <Route path={`/mapper`} component={goMapper}/>
                <Route path={`/pie`} component={funcPie}/>
                <Route path={`/bar`} component={funcBar}/>
                
                
                <Redirect exact strict from="/" to="/snapshot/" />
            </Switch>
        </FetchProvider>
    )
}
