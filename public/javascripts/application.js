$(function() {
	$(".nav-pills li a").on('click', function() {
		$(".nav-pills li").removeClass("active");
		$(this).parent().addClass("active");
	});
});