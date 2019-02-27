import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import { create } from 'domain';
import PrivateRoute from './PrivateRoute';

// create our own history, so that we can redirect with history outside the context of a component
export const history = createHistory();

// set up a component so we can export the routes out of this file
const AppRouter = () => (
    //* in lecture 164, we changed this from  <BrowserRouter>
    // we did this so we could pass in our OWN history prop
    // we also exported the history prop, so we can use it in other files. ultimately we need this to redirect users to the dashboard when they login

    <Router history={history}>
        <div>
            <Switch>
                {/*  whenever this path is matched, render this component */}
                <Route exact path="/" component={LoginPage} />
                <PrivateRoute
                    path="/dashboard"
                    component={ExpenseDashboardPage}
                />
                <PrivateRoute path="/create" component={AddExpensePage} />

                {/* :variableName in the path will dynamically match whatever comes after the forward slash */}
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;

/*
// this jsx is the tree like structure of the router configuration
// to Route, we pass in 2 props, the path we want to match, and what we want to happen when the user visits that path (which component to show) 
const routes = (
    // 1. create an instance of BrowserRouter
    // 2. render a header element on every page of the application
    // 3. use Route for each page in the application (home, about, producets, etc)
    // 3a. pass into Route, the path and the component
    // * NOTE: use a div, (and/or Switch if you imported it) if more than one Route is present! otherwise it will break
    <BrowserRouter>
        <div>
            <Header />

            <Switch>
                
                <Route exact path="/" component={ExpenseDashboardPage} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
   
);
*/
