define(function(require,exports,module){
	var util={};
	util.random=function(){
		return Math.random()*1000;
	};
	module.exports=util;
});