import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

// set up a component so we can export the routes out of this file
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />

            <Switch>
                {/*  whenever this path is matched, render this component */}
                <Route exact path="/" component={ExpenseDashboardPage} />
                <Route path="/create" component={AddExpensePage} />

                {/* :variableName in the path will dynamically match whatever comes after the forward slash */}
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />

                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
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
