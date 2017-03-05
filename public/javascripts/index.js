import React from 'react'
import ReactDom from 'react-dom'
import JournalCreation from './journalCreationView.js'
$.when(
	$.getScript('/javascripts/journalsView.js'),
	$.getScript('/javascripts/journalView.js'),
	$.getScript('/javascripts/models/journal.js'),
	$.getScript('/javascripts/models/location.js'),
	$.getScript('http://maps.googleapis.com/maps/api/js?libraries=places')
).done(function() {
	window.App = {};
	var app = window.App;

	ReactDom.render(
		<JournalCreation />,
		document.getElementById("creationView")
	);

	//app.creationView = new JournalCreationView();
	//var dateTimePicker = app.creationView.getDateTimePicker();
	//app.journalsView = new JournalsView();
	//app.journalsView.setDateTimePicker(dateTimePicker);
});