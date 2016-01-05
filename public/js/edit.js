$(".text").attr("contenteditable","true");

var postEdit = function(evt){
	var data = {},
		block = $(this).closest("[data-block]").data("block"),
		url = document.location.pathname + "/blocks/" + block;
	data[$(this).data("name")] = $(this).html().replace("<br>","");
	$.ajax({
  		method: "POST",
  		url: url,
  		data: data
	});
};


$(".text").blur(postEdit);
$(".newblock").click(postEdit);