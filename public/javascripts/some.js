$(function() {
	tinymce.init({
	    selector: "textarea",
	    plugins: [
	        "advlist autolink lists link image charmap print preview anchor",
	        "searchreplace visualblocks code fullscreen",
	        "insertdatetime media table contextmenu paste",
	        "textcolor"
	    ],
	    resize: false,
	    height: 500,
	    toolbar: "insertfile undo redo | fontselect styleselect fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
	});


	$(function () {
        $('#datetimepicker12').datetimepicker({
            inline: true,
            maxDate: new Date(),
            defaultDate: new Date(),
            sideBySide: true
        });

        $("#datetimepicker12 .datepicker").removeClass("col-md-6");
        $("#datetimepicker12 .timepicker").removeClass("col-md-6");
    });
});