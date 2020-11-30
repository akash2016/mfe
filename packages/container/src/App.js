import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progess from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassname = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
       if(isSignedIn){
           history.push('/dashboard');
       }
    }, [isSignedIn])
    return (
            <Router history={history}>
                <StylesProvider generateClassName={generateClassname}>
                    <div>
                        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                        <Suspense fallback={<Progess />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/">
                                <MarketingLazy isSignedIn={isSignedIn} />
                            </Route>
                        </Switch>
                        </Suspense>
                    </div>
                </StylesProvider>
            </Router>
    );
};