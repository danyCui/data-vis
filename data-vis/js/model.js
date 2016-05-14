var model={
	"commonData":function(data){
		var dataobj={
			title:'某地区蒸发量和降水量',
			data:[
				{
					property:'蒸发量',
					id:'1',
					propertyVal:[
						{id:1,name:'1月',value:2.3},
						{id:1,name:'2月',value:23.3},
						{id:1,name:'3月',value:24.3},
						{id:1,name:'4月',value:22.3},
						{id:1,name:'5月',value:19.3},
						{id:1,name:'6月',value:26.3},
						{id:1,name:'7月',value:45.3},
						{id:1,name:'8月',value:32.3},
						{id:1,name:'9月',value:20.3},
						{id:1,name:'10月',value:23.3},
						{id:1,name:'11月',value:21.3},
						{id:1,name:'12月',value:11.3}
					]
					
				},
				{
					property:'降水量',
					id:'2',
					propertyVal:[
						{id:1,name:'1月',value:2.3},
						{id:1,name:'2月',value:23.3},
						{id:1,name:'3月',value:24.3},
						{id:1,name:'4月',value:15.3},
						{id:1,name:'5月',value:19.3},
						{id:1,name:'6月',value:27.3},
						{id:1,name:'7月',value:56.3},
						{id:1,name:'8月',value:66.3},
						{id:1,name:'9月',value:34.3},
						{id:1,name:'10月',value:26.3},
						{id:1,name:'11月',value:16.3},
						{id:1,name:'12月',value:6.3}
					]
				}
			]
		};
		if(data){
			return init(data);
		}else{
			return dataobj;
		}
		function init(data){
			dataobj.title=data.title;
			var array=[];
			for(var i=0;i<data.data.length;i++){
				var item=data.data[i];
				var obj={};
				obj.property=item.name;
				obj.id=item.id;
				obj.propertyVal=item.children;
				array.push(array);
			}
			dataobj.data=array;
			return dataobj;
		}
	},
	"treeData":function(data){
		var treeobj={
			title:"treeTitle",
			data:{
				"name":"如何学习D3",
				"children":
				[
					{ 
					  "name":"预备知识" , 
				  	  "children":
				  	  [
					  	  	{"name":"HTML & CSS" },
					  	  	{"name":"JavaScript" },
					  	  	{"name":"DOM" },
					  	  	{"name":"SVG" }
				  	  ] 
				  	},
				  	{ 
						"name":"安装" , 
						"children":
						[
							{
								"name":"记事本软件",
								"children":
								[
									{"name":"Notepad++"},
									{"name":"EditPlus"},
									{"name":"Sublime Text"}
								]
							},
							{
								"name":"服务器软件",
								"children":
								[
									{"name":"Apache Http Server"},
									{"name":"Tomcat"}
								]
							},
							{"name":"下载D3.js"}
						] 
					}]
				}
		};
		if(data){
			treeobj.title=data.title;
			treeobj.data=data.data;
			return treeobj;
		}else{
   			return treeobj;
		}
		
	},
	"forceData":function(data){
		var forceobj={
			"nodes":[{id:1234, name: "中国" , value:123   },
					 {id:1234, name: "保定" , value:123  },
				  	 {id:1234, name: "北京" , value:123	},
				     {id:1234, name: "上海" , value:123 },
				     {id:1234, name: "天津" , value:123  },
				     {id:1234, name: "河北" , value:123 },
				     {id:1234, name: "海淀区" , value:123 },
				     {id:1234, name: "西城区" , value:123 }
				  ],
			"edges":[{ source : 0 , target: 2  ,weight:2} ,//source,target为node的索引号
				   { source : 0  , target: 3 ,weight:2 } ,
				   { source : 0  , target: 4 ,weight:2} ,
				   { source : 0  , target: 5 ,weight:2} ,
				   { source : 2  , target: 6 ,weight:2} ,
				   { source : 2  , target: 7 ,weight:2} ,
				   { source : 5  , target: 1 ,weight:2} ]
		};
		var data={
	"title":"title",
	"data":[
		{
			"id":"0001",
			"name":"如何学习D3",
			"value":123,
			"children":[
				{
					"id":"00011",
					"name":"预备知识",
					"value":456,
					"children":[]
				}
			]
		},
		{
			"id":"0002",
			"name":"如何学习D3",
			"value":123,
			"children":[
				{
					"id":"00012",
					"name":"预备知识",
					"value":456,
					"children":[]
				},
				{
					"id":"00021",
					"name":"javascript",
					"value":456,
					"children":[]
				}
			]
		}
	],
	"relationtype":1,//节点关系类型
	"relation":[//表示节点之前的关系，用id标识，权重可有可无
		{"sourceid":"0001","targetid":"0002"},
		{"sourceid":"0001","targetid":"00011"},
		{"sourceid":"0001","targetid":"00012"}
	]
	
};
		if(data){
			return initNodes(data);}
		else{
			return forceobj;
		}
		function initNodes(data){
			var nodes=[];
			var edges=[];
			var rel={};
			for(var i=0;i<data.relation.length;i++){
				var nodeobj={};
				var edgeobj=data.relation[i];
				var sourceid=data.relation[i].sourceid,
					targetid=data.relation[i].targetid;
				if(!rel.hasOwnProperty(sourceid)){
					rel[sourceid]=findname(sourceid,data.data);
//					nodeobj.id=sourceid;
//					nodeobj.name=rel[sourceid];
					edgeobj.source=nodes.length;
					nodes.push({id:sourceid,name:rel[sourceid]});
					
				}else{
					edgeobj.source=nodeindex(sourceid,nodes);
				}
				if(!rel.hasOwnProperty(targetid)){
					rel[targetid]=findname(targetid,data.data);
//					nodeobj.id=targetid;
//					nodeobj.name=rel[targetid];
					edgeobj.target=nodes.length;
					nodes.push({id:targetid,name:rel[targetid]});
				}else{
					edgeobj.target=nodeindex(targetid,nodes);
				}
				edges.push({source:edgeobj.source,target:edgeobj.target});
				function nodeindex(id,nodes){
					for(var i=0;i<nodes.length;i++){
						if(id ==nodes[i].id) return i;
					}
				}//end nodeindex
				
			}
			forceobj.nodes=nodes;
			forceobj.edges=edges;
			//console.log(nodes);
			//console.log(edges);
			return forceobj;
		}
		function findname(id,data){
				if(data == null || data == undefined) return null;
				var d=[];
				d.push(data);
				while(d!=null){
					var list=d.pop();
					for(var i=0;i<list.length;i++){
						if(list[i].id == id){
							return list[i].name;
						}
						if(list[i].children!=null&&list[i].children!=undefined&&list[i].children.length>0){
							d.push(list[i].children);
						}
					}
				}
			}//fun end
		function initedges(data){
			
		}
	}	
}
