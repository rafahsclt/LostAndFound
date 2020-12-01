import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from '../pages/Landing'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes