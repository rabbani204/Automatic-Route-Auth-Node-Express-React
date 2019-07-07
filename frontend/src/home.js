import React from 'react';

import axios from 'axios';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export default class PersonList extends React.Component {
  state = {
	persons: [],
	routes : [],
	selectedUser: '',
	selectedRoute:''
  }

  componentDidMount() {
	  var headers = {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('auth') 
	}
    axios.get(`http://localhost:8200/api/user/routelist`, {headers: headers})
      .then(res => {
		const routes = res.data.data;
		console.log(routes)
        this.setState({ routes });
	  })
	  
	  axios.get(`http://localhost:8200/api/user/list`, {headers: headers})
      .then(res => {
		const persons = res.data.data;
		console.log(persons)
		this.setState({ persons });
		console.log(this.state.persons)
	  })
  }

  handleSubmit = event => {
	event.preventDefault();
	var headers = {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('auth') 
	}
	axios.post(`http://localhost:8200/api/user/setpermission`, {routetitle: this.state.selectedRoute, useremail:this.state.selectedUser}, {headers: headers})
	  .then(res => {
	  })
  }

  render() {
    return (
		<div className="App">
            <div className="container">
			<form onSubmit={this.handleSubmit}>
				<h1>Give Route Permission</h1>
				<div className="row">
					<div className="col-md-6">
					<div class="form-group">
						<label for="sel1">Select User</label>
						
					    <select className="form-control" onChange={event => this.setState({selectedUser: event.target.value})}>
							{
								this.state.persons.map(v => {
									return (
										<option key={v.id} value={v.email}>
										{v.email}
										</option>
									)
								})
							}
						</select>
					</div>
					</div>
					<div className="col-md-6">
					<div class="form-group">
						<label for="sel1">Select Route</label>
					    <select className="form-control" onChange={event => this.setState({selectedRoute: event.target.value})}>
							{
								this.state.routes.map(v => {
									return (
										<option key={v.id} value={v.title}>
										{v.title}
										</option>
									)
								})
							}
				</select>
					</div>
					</div>
				</div>
                 <div className="buttonholder">
				 	<button type="submit" class="btn btn-success">Submit</button>
				 </div>
				 </form>
			</div>
		</div>
    )
  }
}