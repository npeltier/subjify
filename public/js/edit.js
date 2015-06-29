$(".text").attr("contenteditable","true");
$(".text").blur(function(evt){
	var data = {};
	data[$(this).data("name")] = $(this).html().replace("<br>","");
	$.ajax({
  		method: "POST",
  		url: document.location.pathname,
  		data: data
	});
});