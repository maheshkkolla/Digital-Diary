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
								<li>Multiple entries per day </li>
								<li>Date and Time </li>
								<li>Dropbox login </li>
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
	}

	postQuery(evt) {
		evt.preventDefault();
		//TODO: validate before ajax request
		$.ajax({
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

	render() {
		return (
			<div className='modal fade' role='dialog' id={this.modalElementId} >
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h3> Post your query. We will come back to you. </h3>
						</div>
						<div className='modal-body'>
							<form action='' method='' id='postQueryForm'>
								<input type='name' className='form-control' placeholder='Name' ref={(input) => this.name = input}/>
								<br/>
								<input type='email' className='form-control' placeholder='Email' ref={(input) => this.email = input}/>
								<br/>
								<textarea rows='7' className='form-control' placeholder='Write your query here ...' ref={(input) => this.query = input}> </textarea>
								<br/>
								<div className='text-center'>
									<button onClick={this.postQuery.bind(this)} className='btn btn-primary'> Post </button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}