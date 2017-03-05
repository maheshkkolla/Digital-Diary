import React from 'react';
import ReactDom from 'react-dom';
//import JournalCreation from './journal_creation_view';
import JQuery from 'jquery';
import Home from './home';

JQuery(document).ready(() => {
    ReactDom.render(
        <Home />,
        document.getElementById('home')
    );
});



//$.when(
//    $.getScript('/javascripts/journalsView.js'),
//    $.getScript('/javascripts/journalView.js'),
//    $.getScript('/javascripts/models/journal.js'),
//    $.getScript('/javascripts/models/location.js'),
//    $.getScript('http://maps.googleapis.com/maps/api/js?libraries=places')
//).done(function() {
//    window.App = {};
//    var app = window.App;
//    let creationViewEle = document.getElementById("creationView");
//    creationViewEle && ReactDom.render(
//        <JournalCreation />,
//        creationViewEle
//    );
//    creationViewEle || ReactDom.render(
//        <Home />,
//        document.getElementById("home")
//    );
//
//
//
//    //app.creationView = new JournalCreationView();
//    //var dateTimePicker = app.creationView.getDateTimePicker();
//    //app.journalsView = new JournalsView();
//    //app.journalsView.setDateTimePicker(dateTimePicker);
//});