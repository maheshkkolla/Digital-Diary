$(document).ready(function() {
	$("#titleOfJournal").on('focusout', function() {
		var mceTitle =  $(window.journal_ifr.contentDocument).find('#mcetitle');
		if(mceTitle.length > 0)
			$(mceTitle[0]).html($('#titleOfJournal').val());
		else{
			var titelElement = "<h1 id='mcetitle'>" + $('#titleOfJournal').val() + "</h1>";
			$($(window.journal_ifr.contentDocument).find('body')[0]).prepend(titelElement);
		}
	});
});
