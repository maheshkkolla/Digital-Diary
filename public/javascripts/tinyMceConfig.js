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
			editor.on('blur', function() {
				return false; //Do not hide the toolbar on focus out
			});

			editor.on('focus', function() {
			});
		},
		toolbar: "insertfile undo redo | fontselect styleselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link "
	});
});


