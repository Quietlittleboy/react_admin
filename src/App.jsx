import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home';
import Login from './containers/login';
import SiderDemo from './components/basic-layout';


export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                <Route path='/login' exact component={Login} />
                <SiderDemo>
                <Route path='/' exact component={Home} />
                </SiderDemo>
                </Switch>
            </Router>
            
        )
    }
}