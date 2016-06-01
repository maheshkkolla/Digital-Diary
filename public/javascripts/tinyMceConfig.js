$(function(){
	tinymce.init({
	    selector: "#journal",
		inline: true,
		auto_focus: true,
		plugins: [
	        "advlist autolink lists link charmap print preview anchor",
	        "searchreplace visualblocks code fullscreen",
	        "insertdatetime table contextmenu paste",
	        "textcolor"
	    ],
	    content_css: '/stylesheets/style.css',
	    statusbar: false,
		setup: function (editor) {
			var firstTimeFocus = true;
			editor.on('blur', function() {
				return false;
			});

			editor.on('focus', function() {
				firstTimeFocus && positionToolBar();
				firstTimeFocus = false;
			});
		},
		toolbar: "insertfile undo redo | fontselect styleselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link "
	});
});

var positionToolBar = function() {
	var myToolbar = $(".myToolbar");
	var toolbar = $("#mceu_19");
	myToolbar.append(toolbar);
	toolbar.css('top', '0px');
	toolbar.css('left', '0px');

	if(myToolbar.find("#mce_19").length == 0) {
		setTimeout(positionToolBar, 100);
	}
};

