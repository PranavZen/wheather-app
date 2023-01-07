import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import Home from '../component/home';

class Router extends React.Component {

      render() {
            return(
            <BrowserRouter>
                  <Switch>
                        <Route path="/" exact component={Home} />
                  </Switch>
            </BrowserRouter>
            )
      }
}

export default Router;