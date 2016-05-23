define(function(require,exports,module){
	var util=require("./util");
	require("jquery");
	$("body").html(util.random());
	console.log(util.random());
	console.log(require.resolve('jquery'));
});