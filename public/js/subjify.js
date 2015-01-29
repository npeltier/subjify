$(".popup").click(function(e) {
	e.preventDefault();
	$($(this).attr("data-popup")).show();
});