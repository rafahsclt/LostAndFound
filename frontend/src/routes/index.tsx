import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from '../pages/Landing'
import NewFound from "../pages/NewFound"
import NewLost from '../pages/NewLost'
import FoundItems from '../pages/FoundItems'
import LostItems from '../pages/LostItems'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/new-lost" component={NewLost} />
                <Route path="/new-found" component={NewFound} />
                <Route path="/found-items" component={FoundItems} />
                <Route path="/lost-items" component={LostItems} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes