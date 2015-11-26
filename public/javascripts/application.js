$(function() {
	$(".nav-tabs li a").on('click', function() {
		$(".nav-tabs li").removeClass("active");
		$(this).parent().addClass("active");
	});
});