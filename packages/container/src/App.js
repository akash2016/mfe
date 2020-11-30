import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import Progess from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassname = createGenerateClassName({
    productionPrefix: 'co',
})

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    return (
            <BrowserRouter>
                <StylesProvider generateClassName={generateClassname}>
                    <div>
                        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                        <Suspense fallback={<Progess />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/">
                                <MarketingLazy isSignedIn={isSignedIn} />
                            </Route>
                        </Switch>
                        </Suspense>
                    </div>
                </StylesProvider>
            </BrowserRouter>
    );
};