import React from 'react';
import home from './home';
import login from './login'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import axios from 'axios';

export default class PersonList extends React.Component {
  render() {
    return (
       <div className="App">
	   <nav className="navbar navbar-light">
	   <li class="nav-item">
        <a class="nav-link" type="button" href="/login">Login</a>
      </li>
       </nav>       
			<Router>
				<div className="App">
				<Switch>
					<Route path="/home" component={home} />
					<Route path="/login" component={login} />
					</Switch>
				</div>
			</Router>

		</div>
    )
  }
}