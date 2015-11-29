$(function(){
	tinymce.init({
	    selector: "#journal",
	    plugins: [
	        "advlist autolink lists link image charmap print preview anchor",
	        "searchreplace visualblocks code fullscreen",
	        "insertdatetime media table contextmenu paste",
	        "textcolor"
	    ],
	    resize: false,
	    height: 500,
	    body_class: 'tinymceCustomBody',
	    content_css: '/stylesheets/style.css',
	    statusbar: false,
	    setup: function(ed){
            ed.on("init",
                function(ed) {
                    tinyMCE.get('journal').setContent("<h1 id='mcetitle'> Title ...</h1>");
                }
            );
        },
	    toolbar: "insertfile undo redo | fontselect styleselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | submitButton"
	});
});

