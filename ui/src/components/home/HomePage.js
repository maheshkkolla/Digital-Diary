import React from 'react';
import {Jumbotron, Grid, Row, Col} from 'react-bootstrap';

export default class HomePage extends React.Component {

	getTopContent() {
		return (
			<Jumbotron>
				<Col ms="2"/>
				<Col ms="2">
					<div className='name'> Digital Diary </div>
				</Col>
				<Col ms="8" className="sideContent">
					<div className='notes'> Don’t miss life moments. Record you life moments. We will help you </div>
					<a className='btn loginBtn' href='/auth/dropbox'> Login with Dropbox </a>
          { (this.error) && <div className='text-danger'> this.error </div> }
				</Col>
			</Jumbotron>
		);
	}

	getBottomSection() {
		return(
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
		);
	}

	render() {
		return(
			<div>
				{/*<Navbar />*/}
				{this.getTopContent()}
				{this.getBottomSection()}
				{/*<ContactUs />*/}
			</div>
		);
	}
}