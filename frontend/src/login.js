import React from 'react';
import home from './home';
import test from './login'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import axios from 'axios';

export default class PersonList extends React.Component {
	state = {
		email: '',
		password : ''
	}

	handleChangeemail = event => {
		this.setState({ email: event.target.value });
	}

	handleChangepassword = event => {
		this.setState({ password: event.target.value });
	}

	handleSubmit = event => {
		event.preventDefault();
	    console.log('clicked')
		const user = {
		  email: this.state.email,
		  password: this.state.password
		};
	
		axios.post(`http://localhost:8200/api/user/login`, {email: this.state.email, password:this.state.password})
		  .then(res => {
			  console.log(res.data)
			  localStorage.setItem("auth", res.data.token)
		  })
	  }

  render() {
    return (
       <div className="App">
			<div className="container">
				<div className="card">
					<div className="card-header">
						<h1 className="center">Login Here</h1>
					</div>
					<div class="card-body" id="card-body">
                        <div class="formholder">
						    <form onSubmit={this.handleSubmit}>
								<div class="form-group">
									<label for="exampleInputEmail1">Email</label>
									<input type="email" class="form-control" id="exampleInputEmail1" name="email" onChange={this.handleChangeemail} aria-describedby="emailHelp" placeholder="Enter Email"></input>
								</div>

								<div class="form-group">
									<label for="exampleInputEmail1">Password</label>
									<input type="password" class="form-control" id="exampleInputEmail1" name="password" onChange={this.handleChangepassword} aria-describedby="emailHelp" placeholder="Enter Password"></input>
								</div>


								<div class="buttonholder">
									<button type="submit" class="btn btn-primary  btn-block">Login</button>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>

			<Router>
				<div className="App">
				<Switch>
					<Route path="/home" component={home} />
					<Route path="/test" component={test} />
					</Switch>
				</div>
			</Router>

		</div>
    )
  }
}