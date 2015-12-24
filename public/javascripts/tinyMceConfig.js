$(function(){
	tinymce.init({
	    selector: "#journal",
	    plugins: [
	        "advlist autolink lists link charmap print preview anchor",
	        "searchreplace visualblocks code fullscreen",
	        "insertdatetime table contextmenu paste",
	        "textcolor"
	    ],
	    resize: false,
	    height: 500,
	    body_class: 'tinymceCustomBody',
	    content_css: '/stylesheets/style.css',
	    statusbar: false,
	    toolbar: "insertfile undo redo | fontselect styleselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | submitButton"
	});
});

