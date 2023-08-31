import * as d3 from "d3";

function pitch(data,width,height,margin,pitchColor,lineWidth,lineColor,pitchMultiplier,pitchWidth,pitchHeight)
{

  var w=window.innerWidth; console.log(w);
  const svg=d3.select("#ArgVsAus")
              //.append("svg")
              .attr("width",width + margin.left + margin.right)
              .attr("height",height + margin.top + margin.bottom)
              .attr('transform', `translate(-40,-60) scale(0.8,0.8)`);
              
  
   const pitch = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.right})`)
  .attr("class","pitch-lines")
        
  pitch.append('rect')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('fill', pitchColor)
  
      const lines = [];
      // left penalty box
      lines.push({x1: 0, x2: 16.5, y1: pitchHeight/2 - 11 - 9.15, y2: pitchHeight/2 - 11 - 9.15});
      lines.push({x1: 16.5, x2: 16.5, y1: 13.85, y2: pitchHeight/2 + 11 + 9.15});
      lines.push({x1: 0, x2: 16.5, y1: pitchHeight/2 + 11 + 9.15, y2: pitchHeight/2 + 11 + 9.15});
      // left six-yard box
      lines.push({x1: 0, x2: 5.5, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 - 9.15});
      lines.push({x1: 5.5, x2: 5.5, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 + 9.15});
      lines.push({x1: 0, x2: 5.5, y1: pitchHeight/2 + 9.15, y2: pitchHeight/2 + 9.15});
      // right penalty box
      lines.push({x1: pitchWidth - 16.5, x2: pitchWidth, y1: pitchHeight/2 - 11 - 9.15, y2: pitchHeight/2 - 11 - 9.15});
      lines.push({x1: pitchWidth - 16.5, x2: pitchWidth - 16.5, y1: pitchHeight/2 - 11 - 9.15, y2: pitchHeight/2 + 11 + 9.15});
      lines.push({x1: pitchWidth - 16.5, x2: pitchWidth, y1: pitchHeight/2 + 11 + 9.15, y2: pitchHeight/2 + 11 + 9.15});
      // right six-yard box
      lines.push({x1: pitchWidth - 5.5, x2: pitchWidth, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 - 9.15});
      lines.push({x1: pitchWidth - 5.5, x2: pitchWidth - 5.5, y1: pitchHeight/2 - 9.15, y2: pitchHeight/2 + 9.15});
      lines.push({x1: pitchWidth - 5.5, x2: pitchWidth, y1: pitchHeight/2 + 9.15, y2: pitchHeight/2 + 9.15});
      // outside borders
      lines.push({x1: 0, x2: pitchWidth, y1: 0, y2: 0});
      lines.push({x1: 0, x2: pitchWidth, y1: pitchHeight, y2: pitchHeight});
      lines.push({x1: 0, x2: 0, y1: 0, y2: pitchHeight});
      lines.push({x1: pitchWidth, x2: pitchWidth, y1: 0, y2: pitchHeight});
      // middle line
      lines.push({x1: pitchWidth/2, x2: pitchWidth/2, y1: 0, y2: pitchHeight});
      // left goal
      lines.push({x1: -1.5, x2: -1.5, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 + 7.32/2});
      lines.push({x1: -1.5, x2: 0, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 - 7.32/2});
      lines.push({x1: -1.5, x2: 0, y1: pitchHeight/2 + 7.32/2, y2: pitchHeight/2 + 7.32/2});
      // right goal
      lines.push({x1: pitchWidth + 1.5, x2: pitchWidth + 1.5, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 + 7.32/2});
      lines.push({x1: pitchWidth, x2: pitchWidth + 1.5, y1: pitchHeight/2 - 7.32/2, y2: pitchHeight/2 - 7.32/2});
      lines.push({x1: pitchWidth, x2: pitchWidth + 1.5, y1: pitchHeight/2 + 7.32/2, y2: pitchHeight/2 + 7.32/2});

  const pitchLineData = lines;
  pitch.selectAll('.pitchLines')
      .data(pitchLineData)
    .join('line')
      .attr('x1', d => d['x1'] * pitchMultiplier)
      .attr('x2', d => d['x2'] * pitchMultiplier)
      .attr('y1', d => d['y1'] * pitchMultiplier)
      .attr('y2', d => d['y2'] * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', lineColor);
  

      const circles = [];
      // center circle
      circles.push({cx: pitchWidth/2, cy: pitchHeight/2, r: 9.15, color: 'none'});
      // left penalty spot
      circles.push({cx: 11, cy: pitchHeight/2, r: 0.3, color: lineColor});
      // right penalty spot
      circles.push({cx: pitchWidth - 11, cy: pitchHeight/2, r: 0.3, color: lineColor});
      // kick-off circle
      circles.push({cx: pitchWidth/2, cy: pitchHeight/2, r: 0.3, color: lineColor});

  const pitchCircleData = circles;
  pitch.selectAll('.pitchCircles')
      .data(pitchCircleData)
    .join('circle')
      .attr('cx', d => d['cx'] * pitchMultiplier)
      .attr('cy', d => d['cy'] * pitchMultiplier)
      .attr('r', d => d['r'] * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', lineColor)
      .style('fill', d => d['color']);
  

      const arcs = [];
      const cornerRadius = 1 * pitchMultiplier;
      const penaltyRadius = 9.15 * pitchMultiplier;
      // left top corner
      arcs.push({arc: {innerRadius: cornerRadius, outerRadius: cornerRadius + lineWidth, startAngle: 1/2 * Math.PI, endAngle: Math.PI}, 'x': 0, 'y': 0});
      // left bottom corner
      arcs.push({arc: {innerRadius: cornerRadius, outerRadius: cornerRadius + lineWidth, startAngle: 1/2 * Math.PI, endAngle: 0}, 'x': 0, 'y': pitchHeight});
      // right top corner
      arcs.push({arc: {innerRadius: cornerRadius, outerRadius: cornerRadius + lineWidth, startAngle: 3/2 * Math.PI, endAngle: Math.PI}, 'x': pitchWidth, 'y': 0});
      // right bottom corner
      arcs.push({arc: {innerRadius: cornerRadius, outerRadius: cornerRadius + lineWidth, startAngle: 2 * Math.PI, endAngle: 3/2 * Math.PI}, 'x': pitchWidth, 'y': pitchHeight});
      // left penalty arc
      arcs.push({arc: {innerRadius: penaltyRadius, outerRadius: penaltyRadius + lineWidth, startAngle: Math.sin(6.5/9.15), endAngle: Math.PI - Math.sin(6.5/9.15)}, 'x': 11, 'y': pitchHeight/2});
      // right penalty arc
      arcs.push({arc: {innerRadius: penaltyRadius, outerRadius: penaltyRadius + lineWidth, startAngle: -Math.sin(6.5/9.15), endAngle: -(Math.PI - Math.sin(6.5/9.15))}, 'x': pitchWidth - 11, 'y': pitchHeight/2});

  const pitchArcData = arcs;
  const arc = d3.arc();
  pitch.selectAll('.pitchCorners')
      .data(pitchArcData)
    .enter().append('path')
      .attr('d', d => arc(d['arc']))
      .attr('transform', d => `translate(${pitchMultiplier * d.x},${pitchMultiplier * d.y})`)
      .style('fill', lineColor);

      //至此绘制完球场

  var possession=data.map(d=>d.possession);
  var MAX_pos=Math.max(...possession);
  var MIN_pos=Math.min(...possession);

  var r=d3.scaleLinear()
          .domain([MIN_pos*0.8,MAX_pos])
          .range([10,50]);//半径代表控球率

  //console.log(MAX_pos);


  var passes=data.map(d=>d.passes);
  var MAX_pass=Math.max(...passes);

  var rating=data.map(d=>d.rating);
  var color=d3.scaleLinear()
              .domain([d3.min(rating)*0.9,d3.max(rating)*1.1])
              .range([0,1]);//颜色代表rating

  var distance=data.map(d=>d.distance);
  console.log(distance);

  var MAX_dis=Math.max(...distance);
  var MIN_dis=Math.min(...distance);

  var dis=d3.scaleLinear()
            .domain([MIN_dis,MAX_dis])
            .range([10,50]);//边框表示跑动

  console.log(dis(data[0].distance));

  var MAX_rating=d3.max(data.map(d=>d.rating));
  var MAX_shots=d3.max(data.map(d=>d.shots));
  var MAX_tackles=d3.max(data.map(d=>d.tackles));
  var MAX_loss=d3.max(data.map(d=>d.loss));
  var MAX=[MAX_rating,MAX_pass,MAX_pos,MAX_dis,MAX_shots,MAX_tackles,MAX_loss];
  console.log(MAX_tackles);
  


  var radar=function(parent,i)//雷达图生成函数
  {
    var axesDomain = data.columns.slice(1).slice(2,9);
    var Data=Object.values(data[i]).slice(3,10);
    var axesLength =  axesDomain.length;
    let axisLabelFactor = 1.3;
    let axisCircles = 10;
    let angleSlice = Math.PI * 2 / axesLength;
    let dotRadius = 4;
    let radius = 80;
    let margin = 30;
    let height = 300;
    let width=height;

    var option=Data.map((values,i)=>({values,MAX:MAX[i]}));//生成一个对象数组[{values: , MAX: }...]

    let maxValue = 10;
    var rScale = //半径映射函数
    d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, radius]);

   var radarLine = //路径生成函数
   d3.lineRadial()
  .curve(d3['curveCardinalClosed'])
  .radius(d => rScale(d))
  .angle((d, i) => i * angleSlice);

  
  const containerWidth = width-(margin*2);
  const containerHeight = height-(margin*2);
  const container = parent.append('g')
    .attr("class","radar")
    .attr("width", containerWidth)
    .attr("height", containerHeight);
  
	var axisGrid = container.append("g")  //背景
    .attr("class", "axisWrapper");
	
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(axisCircles)+1))
	   .join("circle")
      .attr("class", "gridCircle")
      .attr("r", (d, i) => radius/axisCircles*d)//绘制等级圆圈
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", 0.1);
  
	const axis = axisGrid.selectAll(".axis")
		.data(axesDomain)
		.join("g")
      .attr("class", "axis");

	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScale(maxValue*1) * Math.cos(angleSlice*i - Math.PI/2))
		.attr("y2", (d, i) => rScale(maxValue*1) * Math.sin(angleSlice*i - Math.PI/2))
		.attr("class", "line")
		.style("stroke", "white")  
		.style("stroke-width", "0.12em");


    axis.append("text")
      .attr("class", "legend")
      .style("font-size", "0.95em")
      .style("font-weight", "600")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(maxValue * axisLabelFactor * 1.11) * Math.cos(angleSlice*i - Math.PI/2))
      .attr("y", (d, i) => rScale(maxValue * axisLabelFactor * 0.9) * Math.sin(angleSlice*i - Math.PI/2))
      .text(d => d); 
  
  const plots = container.append('g')
    .selectAll('g')
    .data([option])
    .join('g')
      .attr("fill", 'steelblue')
      .style("fill-opacity", 0.5)
      .attr("stroke", 'steelblue')
      .style("stroke_width", "3px");

  plots.append('path')
    .attr("d", d => radarLine(d.map(v => v.values/v.MAX*maxValue)))
    .attr("fill", (d, i) => 'steelblue')
    .attr("fill-opacity", 0.1)
    .attr("stroke", (d, i) => 'steelblue')
    .attr("stroke-width", 2);

	plots.selectAll("circle")
		.data(d => d)
    .join("circle")
		  .attr("r", dotRadius)
		  .attr("cx", (d,i) => rScale(d.values/d.MAX*maxValue) * Math.cos(angleSlice*i - Math.PI/2))
		  .attr("cy", (d,i) => rScale(d.values/d.MAX*maxValue) * Math.sin(angleSlice*i - Math.PI/2))
		  .style("fill-opacity", 0.8);

    container.attr("visibility","hidden");
  };
  //radar();

  const g = svg.append('g')
    .attr("class","players")
    .style('font-family', 'sans-serif');
    
  g.selectAll('g')
  .data( data )
  .join('g')
    .attr("id",d=>d.name.split(".").pop())
    .attr('font-size', 15)
    .attr('class', 'player-point')
    .attr('transform', d => `translate(${d.posX*(width+margin.left+margin.right)},${d.posY*(height+margin.top+margin.bottom)})`)
    .style('fill-opacity',.8)
  .call(a => a
    .append('circle').attr("class","possesion")
    .attr("fill", d=>d3.interpolateOranges(color(d.rating)))
      .attr('r', d=>(r(d.possession)))
  )  //绘制好代表控球率圆形
  .call(g => g
    .append('text')
      .attr('dx', '1.8em')
      .attr('dy', '0.35em')
    .text(d => d.name)
   ) //显示球员姓名
   .call(g=>g .append('text')
   .attr('dx', '-0.6em')
   .attr('dy', '0.5em')
 .text(d => d.rating))//显示球员rating
    .call(
      a => a
    .append('circle').attr("class","distance")
    .attr("fill", d=>d3.interpolateOranges(color(d.rating)))
      .style('fill-opacity',.2)
      .attr('r', d=>(dis(d.distance))+(r(d.possession)))//绘制球员跑动
    )
   
  svg.selectAll(".player-point").on("mouseenter", function(d){
          let g=d3.select(this);

          //console.log("进入(circle)"+d.name);
          svg.style('fill-opacity',.2);
          svg.selectAll(".pitch-lines").style("stroke-opacity",.2);
          svg.selectAll(".player-point").style("fill-opacity",.2);
          g.style('fill-opacity',1).transition().duration(500)
              .select("circle").attr("r",d=>r(d.possession)*1.5);
          

          g.transition().duration(500)
              .select(".distance").attr("r",d=>(dis(d.distance))+(r(d.possession))*1.5);
          g.select(".radar").attr("visibility","null");

          
      })
      .on("mouseleave", function(d){
        let g=d3.select(this);

       // console.log("离开(circle)"+d.name);
        svg.style('fill-opacity',1);
        svg.selectAll(".pitch-lines").style("stroke-opacity",1);
        svg.selectAll(".player-point").style("fill-opacity",.8);
        g.style('fill-opacity',1).transition().duration(300)
            .select("circle").attr("r",d=>r(d.possession));
            g.transition().duration(300)
            .select(".distance").attr("r",d=>(dis(d.distance))+(r(d.possession)));
        g.select(".radar").attr("visibility","hidden");
        
      })//鼠标进入和离开的事件

      for(let i=0;i<data.length;i++)//为每个球员绘制雷达图
      {
        let parent=g.select('#'+data[i].name.split(".").pop());
        radar(parent,i);
      }

      return svg.node();
}


export default pitch;