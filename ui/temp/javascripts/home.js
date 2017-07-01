//$(function() {
//	$('#postQueryForm').on('submit', function(event) {
//		event.preventDefault();
//		var query = {name: $('[name="name"]').val(), email: $('[name="name"]').val(), query: $('[name="query"]').val() }
//		$.ajax({
//    		url: '/contact/query',
//    		type: 'POST',
//    		data: query
//		}).done(function (res) {
//			$('#query').modal('hide');
//			if(res == 'OK') return;
//			else return;
//		});
//	});
//});

import React from "react"
import Navbar from './navbar'
import Utils from './utils'

export default class Home extends React.Component {
	constructor() {
		super();
		this.error = null;
	}
	render() {

		//body(style='background-color:#d1e0fa !important;')
		// include _navbar
		return (
			<div>
				<Navbar />
				<div className='jumbotron'>
					<div className='col-md-2'> </div>
					<div className='col-md-2'>
						<div className='name'> Digital Diary </div>
					</div>
					<div className='col-md-8 sideContent'>
						<div className='notes'> Don’t miss life moments. Record you life moments. We will help you </div>
						<a className='btn loginBtn' href='/auth/dropbox'> Login with Dropbox </a>
						{ (this.error) && <div className='text-danger'> this.error </div> }
					</div>
				</div>
				<div className='container homeContent'>
					<div className='col-md-4 rightBorder'>
						<h3 className='title'> Features </h3>
						<div className='content'>
							<ul className='features'>
								<li> Unlimited Journals </li>
								<li> Style your content </li>
								<li> Multiple entries per day </li>
								<li> Date and Time </li>
								<li> Dropbox login </li>
							</ul>
						</div>
					</div>
					<div className='col-md-4 rightBorder'>
						<h3 className='title'> Security </h3>
						<div className='content'>
							It is fully private.
							No one can see your journals.
							Digital Diary does not store your journals.
							Your journals will be storing in your dropbox.
						</div>
					</div>
					<div className='col-md-4'>
						<h3 className='title'> Pricing </h3>
						<div className='content'> It is absolutely free. </div>
					</div>
				</div>
				<ContactUs />
			</div>
		);
	}
}

class ContactUs extends React.Component {
	constructor() {
		super();
		this.modalElementId = "query";
		this.errorMessages = {
			name: "Please enter your name",
			email: "Please enter valid email",
			query: "Please write you query"
		};
		this.state = {
			errors: {
				name: false,
				email: false,
				query: false
			}
		};
	}

	getValidationErrors() {
		var errors = {};
		Object.keys(this.state.errors).forEach((field) => {
			(Utils.isNullOrEmpty(this[field].value)) ? (errors[field] = true) : (errors[field] = false);
		});
		Utils.isInvalidEmail(this.email.value) && (errors.email = true);
		return errors;
	}

	validateAndPostQuery(evt) {
		evt.preventDefault();
		this.setState({
			errors: this.getValidationErrors()
		}, this.postQuery.bind(this));
	}

	hasErrors() {
		return Object.keys(this.state.errors).reduce((hasErrors, field) => {
			return hasErrors || this.state.errors[field];
		}, false);
	}

	hasNoErrors() {
		return !(this.hasErrors())
	}

	postQuery() {
		this.hasNoErrors() && $.ajax({
    		url: '/contact/query',
    		type: 'POST',
    		data: {
				name: this.name.value,
				email: this.email.value,
				query: this.query.value
			}
		}).done(this.handleResponse.bind(this));
	}

	handleResponse(res) {
		$('#' + this.modalElementId).modal('hide');
		//TODO: (res == 'OK') ? handleSuccess : handleFailure
	}

	hasErrorOn(field) {
		return(this.state.errors[field]);
	}

	getErrorMessageFor(field) {
		return(this.errorMessages[field]);
	}

	//TODO: placeholder for textarea is not working. So, use labels instead
	render() {
		return (
			<div className='modal fade' role='dialog' id={this.modalElementId} >
				<div className='modal-dialog contactUsForm'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h3> Post your query. We will come back to you. </h3>
						</div>
						<div className='modal-body'>
							<form action='' method='' id='postQueryForm'>
								<label> Name: </label>
								<input type='name' className= { `formControl ${(this.hasErrorOn('name')) ? 'errorFormElement' : ''}` } ref={(input) => this.name = input}/>
								<p className='error'>
									{		(this.hasErrorOn('name')) && this.getErrorMessageFor('name') }
								</p>
								<br/>
								<label> Email: </label>
								<input type='email' className= { `formControl ${(this.hasErrorOn('email')) ? 'errorFormElement' : ''}` } ref={(input) => this.email = input}/>
								<p className='error'>
									{		(this.hasErrorOn('email')) && this.getErrorMessageFor('email') }
								</p>
								<br/>
								<label> Query: </label>
								<textarea rows='7' className= { `formControl ${(this.hasErrorOn('query')) ? 'errorFormElement' : ''}` } ref={(input) => this.query = input}> </textarea>
								<p className='error'>
									{		(this.hasErrorOn('query')) && this.getErrorMessageFor('query') }
								</p>
								<br/>
								<div className='text-center'>
									<button onClick={this.validateAndPostQuery.bind(this)} className='btn btn-primary'> Post </button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}