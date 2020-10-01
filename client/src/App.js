import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginComponent from './components/login.component';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import OverviewComponent from "./components/overview.component";
import ItemViewComponent from "./components/item-view.component";
import UserFormComponent from "./components/user-form.component";
import ItemFormComponent from "./components/item-form.component";

class App extends Component{

  render() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    {
                        localStorage.getItem('token')=== null ? <LoginComponent />
                        : localStorage.getItem('user_role')==='Customer' ? <Redirect to="/items" />
                        : <Redirect to="/overview" />
                    }
                </Route>
                <Route exact path="/overview">
                    {localStorage.getItem('token')=== null ? <Redirect to="/login" /> : <OverviewComponent />}
                </Route>
                <Route exact path="/items">
                    {localStorage.getItem('token')=== null ? <Redirect to="/login" /> : <ItemViewComponent />}
                </Route>
                <Route exact path="/items/add" component={ItemFormComponent}/>
                <Route exact path="/users/add" component={UserFormComponent}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
