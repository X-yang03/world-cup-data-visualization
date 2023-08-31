import * as d3 from "d3";

function simulator(data,width,height,margin,pitchColor,lineWidth,lineColor,pitchMultiplier,pitchWidth,pitchHeight)
{

  var w=window.innerWidth; console.log(w);

  
  const playbutton=d3.select("#buttons").append("input")
                                        .attr("class","btn")
                                        .attr("type","button")
                                        .attr("name","play")
                                        .attr("value","PLAY")
                                        .attr("padding",margin.left);

  const pausebuttion=d3.select("#buttons").append("input")
                                      .attr("class","btn")
                                      .attr("type","button")
                                      .attr("name","pause")
                                      .attr("value","PAUSE");
  const restart=d3.select("#buttons").append("input")
                                      .attr("class","btn")
                                      .attr("type","button")
                                      .attr("name","restart")
                                      .attr("value","RESTART");


 d3.selectAll(".btn").attr('transform','translate(-20,-50)');
  
  const svg=d3.select("#attackgraph")
  .attr("width",width + margin.left + margin.right)
              .attr("height",height + margin.top + margin.bottom)
              .attr('transform', `translate(-40,-80) scale(0.8,0.8)`);
              //.append("svg")
              // .attr("width",width + margin.left + margin.right)
              // .attr("height",height + margin.top + margin.bottom)
              //  .attr("viewBox", [0, 0, width, height])
              // //.attr('transform', `translate(${(w-width)/2},50)`);
              // .attr('transform', `translate(-40,-30) scale(0.8,0.8)`);
      // .attr("width", width)
      // .attr("height", height)
      // .attr("viewBox", [0, 0, width, height])
      // .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
              
  
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


      //var frame=document.getElementById("range").value;
 

    var data_p = data.filter((d) => d.play === "Argentina 1-0 Australia");
    console.log(data_p);
   var data_f = data_p.filter((d) => d.frame == 0);
   console.log(data_f);

  var max_frame = d3.max(data_p, (d) => d.frame);
  console.log(max_frame);
  

  var PlayerName=["football","Gomez","D.Paul","Romero","Allister","Messi","Enzo","Otamendi"];
   const player_svg = svg.append("g");
  player_svg
    .selectAll("circle")
    .data(data_f)
    .join("circle")
    .attr("cx", (d) => d.x/100*width)
    .attr("cy", (d) => d.y/100*height)
    .attr("r", 10)
    .attr("fill", (d) => d.bgcolor)
    .attr("stroke", (d) => d.edgecolor)
    .attr("stroke-width", 2)
    .on("mouseover", function () {
      d3.select(this).attr("stroke", "black").attr("stroke-width", 3);
    })
    .on("mouseout", function () {
      d3.select(this)
        .attr("stroke", (d) => d.edgecolor)
        .attr("stroke-width", 1);
    })
    .call(g=>g.append("title").text((d,i)=>PlayerName[i]));


    var frame=[];
    var nowframe=0;

    var playframe=(i)=>{ 
      let data_f = data_p.filter((d) => d.frame == i);
      player_svg
      .selectAll("circle")
      .data(data_f)
      //.join("circle")
      .attr("cx", (d) => d.x/100*width)
      .attr("cy", (d) => d.y/100*height)
      .attr("r", 10)
      .attr("fill", (d) => d.bgcolor)
      .attr("stroke", (d) => d.edgecolor)
      .attr("stroke-width", 2)
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "black").attr("stroke-width", 3);
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", (d) => d.edgecolor)
          .attr("stroke-width", 2);
      }, 500);};

    var play=()=>{
      playbutton.attr("value","PLAY");
      let time=1;
      frame.splice(0);
      for(let i=nowframe;i<=max_frame;i++,time++)
      {
        var tmp=setTimeout(() => {
          nowframe=i;
          if(nowframe==max_frame)nowframe=0;
          playframe(i);
        }, 28*time);
        frame.push(tmp);
      
    }}

    playbutton.on("click",()=>{console.log("clicked!");play();});
    pausebuttion.on("click",()=>{
      for(let i=0;i<frame.length;i++)
        {clearTimeout(frame[i])};
        playbutton.attr("value","RESUME");
      
    })

    restart.on("click",()=>{
      for(let i=0;i<frame.length;i++)
        {clearTimeout(frame[i])};
      playframe(0);nowframe=0;
      playbutton.attr("value","PLAY");
    })
    
      return svg.node();
}


export default simulator;