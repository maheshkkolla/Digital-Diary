var notify = function(options) {
	var time = options.time || 7000;
	var html = "<div class='notification'><span class='message'>"+options.message+"</span></div>";
	var notification = $(html)
	$('.notifiers').append(notification);
	if(options.close){
		var close = $("<div class='close'>x</div>")
		notification.prepend(close);
		$(close).on('click', function() {
			notification.remove();
		});
	}
	else {
		setTimeout(function(){
			notification.remove();
		}, time);
	}
}

 