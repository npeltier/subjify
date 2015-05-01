$(".popup").click(function(e) {
	e.preventDefault();
	$(".popup-content").hide();
	$($(this).attr("data-popup")).show(400);
});