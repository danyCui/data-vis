$(function(){
	loaddata();
	var currentActive=null;
	$(".data-source").on("click","li",function(){
		$(".content").empty();
		var data=$(this).data("source");
		var html="<p>Title:"+data.title+"</p>"+
				"<p>SubTitle:"+data.subtitle+"</p>"+
				"<p>DATA:"+JSON.stringify(data.data)+"</p>";
				//console.log(html);
		currentActive=data;
		$(".content").html(html);
	});
	$('.layout-list').on("click","li",function(){
		var type=$(this).data("type");
		switch(type){
			case 1:
					createBar(currentActive);
					break;
			case 2:
					createLine(currentActive);
					break;
			case 3:
					
					createPie(currentActive);
					break;
			case 4:
					createTree(currentActive);
					break;
			case 5:
					createFord();
					break;
			case 6:
					createChord();
					break;
			case 7:
					console.log(type);
					break;
			case 8:
					console.log(type);
					break;
			default:
					console.log("default");
		}
	});
})

function loaddata(){
	$.ajax({
			type:"get",
			url:'http://10.108.215.140:8888/springmvc/view/viewaction',
			async:"false",
			data:"",
			dataType:"json",
			crossDomain:true,
			success:function (data) {
				console.log(data);
				var html='<ul class="sourcelists"><li class="sourcelist">'+data.title+'</li></ul>';
					$('.data-source').append(html);
					$('.sourcelist').data("source",data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
						//console.log(data);
                        console.log(XMLHttpRequest.status);
                      //  alert(XMLHttpRequest.readyState);
                      //  alert(textStatus);
                    }
		});
}
function createBar(currentActive){
	$(".content").empty();
	var html='<div id="main"></div>';
	$(".content").append(html);
	var barData=model.commonData(currentActive);
	//console.log(barData);
	var main=document.getElementById('main');
	drawBar(main,barData);
}
function createLine(currentActive){
	$(".content").empty();
	var html='<div id="main"></div>';
	$(".content").append(html);
	var lineData=model.commonData(currentActive);
	var main=document.getElementById('main');
	drawLine(main,lineData);
}
function createPie(currentActive){
	$(".content").empty();
	var active=model.commonData(currentActive);
	var array=new Array();
	var html='<div class="dataproperty"></div>'+
			  '<div id="main"></div>';
	$('.content').append(html);
	//console.log(active);
	var frag='<ul class="datalists">';
	for(var i=0;i<active.data.length;i++){
		frag+='<li class="datalist"  data-id="'+active.data[i].id+'">'+active.data[i].property+'</li>';
	}
	frag+='</ul>';
	$('.dataproperty').append(frag);
	$('.dataproperty').on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var id=$(this).data("id");
		var main=document.getElementById('main');
		var piedata={};
		for(var j=0;j<active.data.length;j++){
					if(active.data[j].id == id){
						pieData={
							"title":active.title+"——"+active.data[j].property,
							"data":active.data[j].propertyVal
						}
						//console.log(piedata);
						drawPie(main,pieData);
						return;
					}
				}	
	});
	$('.dataproperty').find("li").eq(0).trigger("click");
	
}
function createTree(currentActive){
	$(".content").empty();
	var width = $(".content").width()*0.9;
	var height = 500;
	
	//边界空白
	var padding = {left: 80, right:50, top: 20, bottom: 20 };
	//创建svg容器
	var svg = d3.select(".content")
           .append("svg")
           .attr("id","svgTree")
	       .attr("width", width)
	       .attr("height", height + padding.top + padding.bottom);
    var svgcontainer= svg.append("g")
    	   			     .attr("transform","translate("+ padding.left + "," + padding.top + ")");
  	//保存图片标志
 	savePic(width-20,height,svg.attr("id"));
 	
 	var treeData=model.treeData(currentActive);
 	//console.log(treeData.data);
 	drawTree(width,height,svgcontainer,treeData);
}
function createFord(currentActive){
	$(".content").empty();
	var width  = $(".content").width()*0.9;	//SVG绘制区域的宽度
	var height = 500;	//SVG绘制区域的高度
		
	var svg = d3.select(".content")			//选择<body>
				.append("svg").attr("id","svgFord")			//在<body>中添加<svg>
				.attr("width", width)	//设定<svg>的宽度属性
				.attr("height", height);//设定<svg>的高度属性
	savePic(width-20,height,svg.attr("id"));
	//1.确定初始数据
	var forceData = model.forceData(currentActive);
	drawFord(svg,width,height,forceData.nodes,forceData.edges);
}
function createChord(){
	$(".content").empty();
	var width  = $(".content").width()*0.9;	//SVG绘制区域的宽度
	var height = 500;	//SVG绘制区域的高度
	var margin=($(".content").width()-height)/2;
	var svg = d3.select(".content")			//选择<body>
				.append("svg").attr("id","svgChord")
				.attr("class","chordsvg")			//在<body>中添加<svg>
				.attr("width", width)	//设定<svg>的宽度属性
				.attr("height", height);//设定<svg>的高度属性
	$(".chordsvg").css("margin-left",margin);	
	savePic(width-margin-20,height,svg.attr("id"));
	//1.确定初始数据
	var chordData={
		"name":[ "亚洲" , "欧洲" , "非洲" , "美洲" , "大洋洲"  ],
		"matrix":[
	  [ 9000,  870　 , 3000　, 1000 , 5200 ],
	  [ 3400,  8000　, 2300　, 4922 , 374  ],
	  [ 2000,  2000　, 7700　, 4881 , 1050 ],
	  [ 3000,  8012  , 5531  , 500  , 400  ],
	  [ 3540,  4310　, 1500  , 1900 , 300 ]
	]
	}
	drawChord(svg,height,height,chordData.name,chordData.matrix);
}
function savePic(width,height,svg){
	var xmlns = "http://www.w3.org/2000/svg";
	var svg_img = document.createElementNS(xmlns, "image");
	
	svg_img.href.baseVal = "./images/save.png";
	svg_img.setAttributeNS(null,"id","svg_img");
	svg_img.setAttributeNS(null,"width","20px");
	svg_img.setAttributeNS(null,"height","20px");
	svg_img.setAttributeNS(null,"x",width);
	svg_img.setAttributeNS(null,"y",20);
	var svgid=document.getElementById(svg);
	svgid.appendChild(svg_img);
	$('.content').find(svgid).on("click","image",function(){
	    	 
	    	 saveSvgAsPng(svgid, "diagram.png");
	    	
	    });
}
