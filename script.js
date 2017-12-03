
// Sarah, Alison, Helena, Cosima, Rachel, Tony
var colorArr = ["#1da4d1","#f41c54","#ffcd00","#36bf63","#9875b2","#95a673"]

// 获取数据并对所需数据进行筛选
var data = mainGanttJson;
data = data.filter(function (d) {
	return d.character !== "Beth" && d.character !== "Katja";
});

// 画布基本信息
var padding = 40;
var width = 700;
var height= 360;
var svg = d3.select("#mainGantt").append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("fill", "#fff")


// 定义比例尺
var x = d3.scale.linear()
	.domain([0, 43])
	.range([padding, width - padding]);
var y = d3.scale.ordinal()
	.rangeRoundBands([0, height-padding], .6)
	.domain(data.map(function (d) {
		return d.episode;
	}));

// 定义坐标轴
var xAxis = d3.svg
	.axis()
	.scale(x)
	.tickSize(height)
	.orient("bottom")
	.ticks(9);
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")

// 往画布中绘制坐标轴
var gx = svg.append("g")
	.attr("transform", "translate(0," + (-padding) + ")")
	.attr("class", "axis xAxis")
	.call(xAxis);
var gy = svg.append("g")
	.attr("class", "axis yAxis")
	.attr("transform", "translate(" + (padding-5) + ",0)")
	.call(yAxis);


// 角色出现时间甘特图绘制
var timeline = svg.selectAll(".bar")
	.data(data)
	.enter()
	.append("g");
timeline.append("rect")
	.attr("class", function(d){
		return d.character + " charaBar";
	})
	.attr("fill", function(d){
		switch(d.character){
			case "Sarah":
				return colorArr[0];
				break;
			case "Alison":
				return colorArr[1];
				break;
			case "Helena":
				return colorArr[2];
				break;
			case "Cosima":
				return colorArr[3];
				break;
			case "Rachel":
				return colorArr[4];
				break;
			case "Tony":
				return colorArr[5];
				break;
			default:
				return colorArr[0];
		}
	})
	.attr("opacity", 0.4)
	.attr("rx", 4)
	.attr("ry", 4)
	.attr("y", function(d){
		return y(d.episode);
	})
	.attr("height", y.rangeBand())
	.attr("x", function(d){
		return x(d.startmin);
	})
	.attr("width", function(d){
		return x(d.stopmin) - x(d.startmin);
	});
	

// hover角色时高亮角色出现的时间条
var allImgs = $('#img .item');
var allBars = d3.selectAll(".charaBar");
allImgs.mouseover(function(e){
	var name = e.currentTarget.id;
	var bars = d3.selectAll("."+name);
	allBars.attr("opacity", .1);
	bars.attr("opacity", 1);
})
allImgs.mouseout(function(){
	allBars.attr("opacity", .4);
})


