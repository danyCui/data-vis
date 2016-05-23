define(require,exports,module){
	function drawPie(main,pieData){
		var chart=echarts.init(main);
		var option = {
		    title : {
		        text: pieData.title,
		        subtext: pieData.subtitle,
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        y:'top',
		        data:pieData.data.map(function(item,index,array){
								return item.name;
							})
				
		    },
		    toolbox: {
		        show : true,
		        orient:'vertical',
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:pieData.title,
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:pieData.data
		        }
		    ]
		};
	    chart.setOption(option, true); 
	}
	function drawBar(main,barData){
		//获取X轴的值
		var xAxis=barData.data[0].propertyVal.map(function(item,index,array){
								return item.name;
						});
		//获取series的变量值
		var series=barData.data.map(function(item,index,array){
			var array=new Array();
			(function(){
				for(var i=0;i<xAxis.length;i++){
					var val=xAxis[i];
					var result=propertyData(val,item.propertyVal);
					//console.log(result);
					array.push(result);
				}
			})();
			var o={
		            name:item.property,
		            type:'bar',
		            data:array
		            
		       };
		       return o;
		});
		//console.log(series);
		var chart=echarts.init(main);
		var option = {
		    title : {
		        text: barData.title,
		        subtext: barData.subtitle,
		        x:'center',
		        y:'top'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:barData.data.map(function(item,index,array){
								return item.property;
							}),
				orient : 'vertical',
		        x : 'left',
		        y:'top'
		    },
		    toolbox: {
		        show : true,
		        orient:'vertical',
		        x:'right',
		        y:'center',
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : xAxis
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series :series
		};
		chart.setOption(option, true); 
	}
	function propertyData(x,propertyArray){
			if(propertyArray.length>0){
				for(var i=0;i<propertyArray.length;i++){
					if(propertyArray[i].name==x) return propertyArray[i].value;
				}
				return 0;
			}
			return 0;
	}
	function drawLine(main,lineData){
		var chart=echarts.init(main);
		var xAxis=lineData.data[0].propertyVal.map(function(item,index,array){
							return item.name;
					});
		//获取series的变量值
		var series=lineData.data.map(function(item,index,array){
		var array=new Array();
		(function(){
			for(var i=0;i<xAxis.length;i++){
				var val=xAxis[i];
				var result=propertyData(val,item.propertyVal);
				//console.log(result);
				array.push(result);
			}
		})();
		var o={
	            name:item.property,
	            type:'line',
	            data:array
	            
	       };
	       return o;
		});
		var option = {
		    title : {
		        text: lineData.title,
		        subtext: lineData.subtitle,
		        x:'center',
		        y:'top'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:lineData.data.map(function(item,index,array){
								return item.property;
							}),
				orient : 'vertical',
		        x : 'left',
		        y:'top'
		    },
		    toolbox: {
		        show : true,
		        orient:'vertical',
		        x:'right',
		        y:'center',
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : xAxis
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		                formatter: '{value} °C'
		            }
		        }
		    ],
		    series : series
		};
		chart.setOption(option, true);
	}
	//绘制树形图
	function drawTree(width,height,svg,data){
		//树状图布局
		var tree = d3.layout.tree()
	            .size([height, width]);

		//对角线生成器
		var diagonal = d3.svg.diagonal()
	    .projection(function(d) { return [d.y, d.x]; });
		
		var root=data.data;
		//alert();
		svg.append("text")
		.attr("x",width/2-80-(data.title.length)/2)
		.attr("y","10px")
		.attr("font-weight","bold")
		.attr("font-size","24px")
		.text(data.title);
		//给第一个节点添加初始坐标x0和x1
		root.x0 = height / 2+50;
		root.y0 = 0;

		//以第一个节点为起始节点，重绘
		redrawTree(root);

	    //重绘函数
	    function redrawTree(source){

		    /*
		    （1） 计算节点和连线的位置
		    */
		
		    //应用布局，计算节点和连线
		    var nodes = tree.nodes(root);
		    var links = tree.links(nodes);

		    //重新计算节点的y坐标
		    nodes.forEach(function(d) { d.y = d.depth * 180; });

		    /*
		    （2） 节点的处理
		    */

		    //获取节点的update部分
		    var nodeUpdate = svg.selectAll(".node")
		                        .data(nodes, function(d){ return d.name; });
		
		    //获取节点的enter部分
		    var nodeEnter = nodeUpdate.enter();
		
		    //获取节点的exit部分
		    var nodeExit = nodeUpdate.exit();

		    //1. 节点的 Enter 部分的处理办法
		    var enterNodes = nodeEnter.append("g")
		                    .attr("class","node")
		                    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
		                    .on("click", function(d) { toggle(d); redrawTree(d); });
		
		    enterNodes.append("circle")
		      .attr("r", 0)
		      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
		
		    enterNodes.append("text")
		        .attr("x", function(d) { return d.children || d._children ? -14 : 14; })
		        .attr("dy", ".35em")
		        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
		        .text(function(d) { return d.name; })
		        .style("fill-opacity", 0);


		    //2. 节点的 Update 部分的处理办法
		    var updateNodes = nodeUpdate.transition()
		                        .duration(500)
		                        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
		
		    updateNodes.select("circle")
		      .attr("r", 8)
		      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
		
		    updateNodes.select("text")
		      .style("fill-opacity", 1);

		    //3. 节点的 Exit 部分的处理办法
		    var exitNodes = nodeExit.transition()
		                      .duration(500)
		                      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
		                      .remove();

		    exitNodes.select("circle")
		      .attr("r", 0);
		
		    exitNodes.select("text")
		      .style("fill-opacity", 0);

		    /*
		    （3） 连线的处理
		    */

		    //获取连线的update部分
		    var linkUpdate = svg.selectAll(".link")
		                        .data(links, function(d){ return d.target.name; });
		
		    //获取连线的enter部分
		    var linkEnter = linkUpdate.enter();
		
		    //获取连线的exit部分
		    var linkExit = linkUpdate.exit();

		    //1. 连线的 Enter 部分的处理办法
		    linkEnter.insert("path",".node")
		          .attr("class", "link")
		          .attr("d", function(d) {
		              var o = {x: source.x0, y: source.y0};
		              return diagonal({source: o, target: o});
		          })
		          .transition()
		          .duration(500)
		          .attr("d", diagonal);
		
		    //2. 连线的 Update 部分的处理办法
		    linkUpdate.transition()
		        .duration(500)
		        .attr("d", diagonal);
		
		    //3. 连线的 Exit 部分的处理办法
		    linkExit.transition()
		          .duration(500)
		          .attr("d", function(d) {
		            var o = {x: source.x, y: source.y};
		            return diagonal({source: o, target: o});
		          })
		          .remove();


		    /*
		    （4） 将当前的节点坐标保存在变量x0、y0里，以备更新时使用
		    */
		    nodes.forEach(function(d) {
		      d.x0 = d.x;
		      d.y0 = d.y;
		    });
		
		  }

		  //切换开关，d 为被点击的节点
		  function toggle(d){
		    if(d.children){ //如果有子节点
		      d._children = d.children; //将该子节点保存到 _children
		      d.children = null;  //将子节点设置为null
		    }else{  //如果没有子节点
		      d.children = d._children; //从 _children 取回原来的子节点 
		      d._children = null; //将 _children 设置为 null
		    }
		  }
	}

	//绘制力导向图
	function drawFord(svg,width,height,nodes,edges){
				//2.转换数据
			var force = d3.layout.force()
								.nodes(nodes)	//设定顶点数组
								.links(edges)	//设定边数组
								.size([width,height])	//设定作用范围
								.linkDistance(90)	//设定边的距离
								.charge(function(d){
									return Math.random()*(-1000);
								});	//设定顶点的电荷数
			
			force.start();	//开启布局计算
			
			console.log(nodes);	//输出转换后的数据
			console.log(edges);
			
			//3.绘制
			var color = d3.scale.category20();
			
			var drag = force.drag()
							.on("dragstart",function(d){
								//拖拽开始后设定被拖拽对象为固定
								d.fixed = true; 
							})
							.on("dragend",function(d,i){
								//拖拽结束后变为原来的颜色
								d3.select(this).style("fill",color(i));
							})
							.on("drag",function(d){
								//拖拽中对象变为黄色
								d3.select(this).style("fill","yellow");
							});
				
			//绘制连线
			var lineupdate=svg.selectAll(".forceLine")
								.data(edges);
			var lineenter=lineupdate.enter().append("line")
								.attr("class","forceLine");;				
			var lineexit=svg.selectAll(".forceLine")
								.data(edges)
								.exit().remove();
			
			//绘制节点
			var circlesupdate=svg.selectAll(".forceCircle")
								.data(nodes);
			var circlesenter=circlesupdate.enter()
								.append("circle")
								.attr("class","forceCircle")
								.attr("r",20)
								.style("fill",function(d,i){
									return color(i);
								})
								.call(force.drag);
			var circlesexit=circlesupdate.exit().remove;
			
			//绘制文字
			var textsupdate=svg.selectAll(".forceText")
								.data(nodes);
			var textsenter = textsupdate.enter()
								.append("text")
								.attr("class","forceText")
								.attr("x",function(d){ return d.x; })
								.attr("y",function(d){ return d.y; })
								.attr("dy", ".3em")
								.text(function(d){ return d.name; });
			var textsexit=textsupdate.exit().remove();
			//tick事件的监听器
			force.on("tick", function(){
				
				 //更新边
				 lineenter.attr("x1",function(d){ return d.source.x; });
				 lineenter.attr("y1",function(d){ return d.source.y; });
				 lineenter.attr("x2",function(d){ return d.target.x; });
				 lineenter.attr("y2",function(d){ return d.target.y; });
				 
				 //更新顶点
				 circlesenter.attr("cx",function(d){ return d.x; });
				 circlesenter.attr("cy",function(d){ return d.y; });
				 
				 //更新顶点文字
				 textsenter.attr("x",function(d){ return d.x; });
				 textsenter.attr("y",function(d){ return d.y; });
				 
			});
			
			
			//力学图运动开始时
			force.on("start", function(){
				console.log("运动开始");
			});
				
			//力学图运动结束时
			force.on("end", function(){
				console.log("运动结束");
			});
	}

	//绘制弦图
	function drawChord(svg,width,height,continent,population){
		//2.转换数据
			var chord = d3.layout.chord()
				           .padding(0.03)
				           .sortSubgroups(d3.ascending)
				           .matrix(population);

			console.log(chord.groups());
			console.log(chord.chords());
			
			
			//3.绘制
			
			//弦图的<g>元素
			var gChord = svg.append("g")
							.attr("transform","translate(" + width/2 + "," + height/2 + ")");
			
			//节点的<g>元素
			var gOuter = gChord.append("g");

			//弦的<g>元素
			var gInner = gChord.append("g");

			//颜色比例尺
			var color20 = d3.scale.category20();
			
			//绘制节点
			var innerRadius = width/2 * 0.7;
			var outerRadius = innerRadius * 1.1;
			
			//弧生成器
			var arcOuter =  d3.svg.arc()
						 .innerRadius(innerRadius)
						 .outerRadius(outerRadius);
			
			var arcOuterupdate=gOuter.selectAll(".outerPath")
								.data(chord.groups());
			var arcOuterenter=arcOuterupdate.enter()
								.append("path")
								.attr("class","outerPath")
								.style("fill", function(d) { return color20(d.index); })
								.attr("d", arcOuter );
			var arcOuterexit=arcOuterupdate.exit().remove();
	//		gOuter.selectAll(".outerPath")
	//							.data(chord.groups())
	//							.enter()
	//							.append("path")
	//							.attr("class","outerPath")
	//							.style("fill", function(d) { return color20(d.index); })
	//							.attr("d", arcOuter );
			var textupdate =	gOuter.selectAll(".outerText")
								.data(chord.groups());
			var textenter = textupdate.enter()
								.append("text")
								.each( function(d,i) {
									d.angle = (d.startAngle + d.endAngle)/2;
									d.name = continent[i];
								})
								.attr("class","outerText")
								.attr("dy",".35em")
								.attr("transform", function(d){
									var result = "rotate(" + ( d.angle * 180 / Math.PI ) + ")";

									result += "translate(0,"+ -1.0 * ( outerRadius + 10 ) +")" ;
									
									if( d.angle > Math.PI * 3 / 4 &&  d.angle < Math.PI * 5 / 4 )
										result += "rotate(180)";
									
									return result;
								})
								.text(function(d){
									return d.name;
								});
				var textexit=	textupdate.exit().remove();

			//绘制弦
			var arcInner =  d3.svg.chord()
							.radius(innerRadius);
			
			
			var arcInnerupdate=gInner.selectAll(".innerPath")
								.data(chord.chords());
			var arcInnerenter=arcInnerupdate.enter()
								.append("path")
								.attr("class","innerPath")
								.attr("d", arcInner )
								.style("fill", function(d) { return color20(d.source.index); });
			var arcInnerexit=arcInnerupdate.exit().remove();
		
			gOuter.selectAll(".outerPath")
				.on("mouseover",fade(0.0))		//鼠标放到节点上
				.on("mouseout",fade(1.0));		//鼠标从节点上移开
				
			function fade(opacity){
				//返回一个function(g, i)
				return function(g,i){
					
					gInner.selectAll(".innerPath")	//选择所有的弦
							.filter( function(d) { 	//过滤器
								//没有连接到鼠标所在节点的弦才能通过
								return d.source.index != i && d.target.index != i; 
							})
							.transition()	//过渡
							.style("opacity", opacity);	//透明度
				}
				
			}
	}
}
