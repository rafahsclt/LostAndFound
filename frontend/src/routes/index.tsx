import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from '../pages/Landing'
import NewLost from '../pages/NewLost'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/new-lost" component={NewLost} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes