import * as d3 from "d3";
import {easeLinear} from "d3";

function Streamgraph(data, {
} = {}) 
{
  //console.log(data);
  var x=d=>new Date(d.date);
  var y=d=>d.unemployed;
  var z=d=>d.industry;
  var yLabel="↑ Scored Goals";
  var marginTop = 40;
  var marginRight = 260;
  var marginBottom = 30;
  var marginLeft = 40;
  var width=1800;
  var height=825;
  var xType = d3.scaleTime;
  var xDomain;
  var xRange = [marginLeft, width - marginRight];
  var yType = d3.scaleLinear;
  var yDomain;
  var yRange = [height - marginBottom, marginTop];
  var zDomain;
  var offset= d3.stackOffsetNone;
  var order= d3.stackOrderAscending;
  var colors= d3.schemeSet1.concat(d3.schemeSet2);

  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  // Compute default x- and z-domains, and unique the z-domain.
  if (xDomain === undefined) xDomain = d3.extent(X);
  console.log(xDomain);
  if (zDomain === undefined) zDomain = Z;
  console.log(zDomain);
  zDomain = new d3.InternSet(zDomain);
  console.log(zDomain);

  // Omit any data not present in the z-domain.
  const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));
  console.log(I);

  const series = d3.stack()
      .keys(zDomain)
      .value(([x, I], z) => Y[I.get(z)])
      .order(order)
      .offset(offset)
    (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));
    console.log(series);

  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = d3.extent(series.flat(2));
  console.log(yDomain);
  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 50);
  console.log(colors);

  const area = d3.area()
      .x(({i}) => xScale(X[i]))
      .y0(([y1]) => yScale(y1))
      .y1(([, y2]) => yScale(y2));

  const svg = d3.select("#streamgraph")
      .attr("transform", `translate(0,30)`)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("class","axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("color","red")
          .attr("font-size","small")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("g")
    .attr("class","graph")
    .attr("fill-opacity",0)
    .selectAll("path")
    .data(series)
    .join("path")
      .attr("fill", ([{i}]) => color(Z[i]))
      .attr("d", area)
      .attr("id","Path")
    .append("title")
      .text( ([{i}]) => Z[i] );

    d3.select(".graph").transition().duration(5000).ease(easeLinear).attr("fill-opacity",1);

    const changeOpacityOn=(event) =>{
        d3.selectAll("#Path").attr("fill-opacity",0.1);
        d3.select(event.currentTarget).attr("fill-opacity",1);
    };
    const changeOpacityOff=(event) =>{
        d3.selectAll("#Path").attr("fill-opacity",1);
    };
    svg.selectAll("path")
        .on("mouseover",changeOpacityOn)
        .on("mouseout",changeOpacityOff);

    
  svg.append("g")
      .attr("class","axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);  

  d3.selectAll(".x.axis line")
    .style("stroke","gray");

  var data_legend = [
    {
        "name":"[SA]Brazil(8)",
        "color":"#4daf4a"
    },
    {
        "name":"[AS]SouthKorea(16)",
        "color":"#e78ac3"
    },
    {
        "name":"[EU]England(8)",
        "color":"#ff7f00"
    },
    {
        "name":"[SA]Argentina",
        "color":"#e41a1c"
    },
    {
        "name":"[EU]Netherlands(8)",
        "color":"#999999"
    },
    {
        "name":"[EU]Spain(16)",
        "color":"#a6d854"
    },
    {
        "name":"[EU]France",
        "color":"#ffff33"
    },
    {
        "name":"[EU]Poland(16)",
        "color":"#66c2a5"
    },
    {
        "name":"[AS]Japan(16)",
        "color":"#a65628"
    },
    {
        "name":"[EU]Portugal(8)",
        "color":"#fc8d62"
    },
    {
        "name":"[NA]UnitedStates(16)",
        "color":"#e5c494"
    },
    {
        "name":"[OA]Australia(16)",
        "color":"#377eb8"
    },
    {
        "name":"[EU]Switzerland(16)",
        "color":"#ffd92f"
    },
    {
        "name":"[AF]Morocco(4)",
        "color":"#f781bf"
    },
    {
        "name":"[AF]Senegal(16)",
        "color":"#8da0cb"
    },
    {
        "name":"[EU]Croatia(4)",
        "color":"#984ea3"
    }
];

  var legend = svg.selectAll(".legend") 
  .data(data_legend)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + (i * 20 + 300) + ")"; });  

  legend.append("rect")
  //.attr("x", width - 25) 
   .attr("x", (width / 160) * 157)  
  .attr("y", 8)
  .attr("width", 20)
  .attr("height", 10)
  .style("fill", function(d){
      return d.color
  });

  legend.append("text")
    .attr("x", width - 35)
    //.attr("x", (width / 40) * 39)
    .attr("y", 18)
    .style("font-family","monospace")
    .style("stroke","white")
    .style("text-anchor", "end") 
    .text(function(d) { 
        return d.name;
    });

  return Object.assign(svg.node(), {scales: {color}});
}

export default Streamgraph;  