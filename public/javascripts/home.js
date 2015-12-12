$(function() {
	$('#postQueryForm').on('submit', function(event) {
		event.preventDefault();
		var query = {name: $('[name="name"]').val(), email: $('[name="name"]').val(), query: $('[name="query"]').val() }
		$.ajax({
    		url: '/contact/query',
    		type: 'POST',
    		data: query
		}).done(function (res) {
			$('#query').modal('hide');
			if(res == 'OK') return;
			else return;
		});
	});
});