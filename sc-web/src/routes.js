import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from  './components/login';
import Register from './components/register';
import Vitrine from './components/vitrine';

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={props => 
            isAuthenticated() ? (
                <Component {...props}/>
            ):(
                <Redirect to={{pathname: '/', state: {from: props.location}}} />
            )
            

        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <Login />} />
            <Route path="/register" component={() => <Register />} />
            <PrivateRoute path="/vitrine" component={() => <Vitrine />} />
            <Route path="*" component={() => <h1>Page Not Found</h1>} />
        </Switch>
    </BrowserRouter>
)

export default Routes;