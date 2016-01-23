var notify = function(options) {
	var time = options.time || 7000;
	var notificationHtml = "<div class='notification'><span class='message'>"+options.message+"</span></div>";
	var notification = $(notificationHtml);
	$('.notifiers').append(notification);
	if(options.close){
		var close = $("<div class='close'>x</div>");
		notification.prepend(close);
		$(close).on('click', function() {
			removeNotification(notification)
		});
	} else {
		setTimeout(function(){
			removeNotification(notification);
		}, time);
	}

	return notification;
};

var removeNotification = function(notification) {
	notification.remove()
};

 