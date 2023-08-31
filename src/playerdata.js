import * as d3 from "d3";

function pie(data,width,height,margin)
{
  //var tmp=data.columns.slice(1);
  var chartData = (data.columns.slice(1)).map(y => {
    const values = data.map(d => d[y]).slice(0,7);
    //const age=data.map(d=>d[y])slice(7);
    return {
      name: y,
      values: values,
      age:(data.map(d=>d[y]))[7],
      total: values.reduce((a, b) => (a + b)/2)
    }
  });
  console.log(chartData);

  var skills = data.map(d => d.skill).slice(0,7);console.log(skills);

  var color = d3.scaleOrdinal(d3.schemeTableau10).domain(skills);

  var MIN_age=d3.min(chartData.map(d => d.age));


  var MAX_age=d3.max(chartData.map(d => d.age));

  var xDomain=d3.range(MIN_age,MAX_age+1);;

  var x = d3.scaleBand()
  .domain(xDomain)
  .range([margin.left, width - margin.left - margin.right]);

  var hx = x.bandwidth() / 1.5;

    const ext = d3.extent(chartData.map(d => d.total));
    //value(total) to length ratio of radius
   const f = (ext[1] - ext[0]) / (height - margin.bottom - margin.top * 2);
   // margin = 1.5 radius
    ext[0] -= hx * 1.5 * f;
    ext[1] += hx * 1.5 * f;
    
    var y= d3.scaleLinear().domain(ext).range([height - margin.top - margin.bottom, margin.top]);
  

   var r = d3.scaleLinear()
  .domain(d3.extent(chartData.map(d => d.total)))
  .range([hx / 2, hx]);

  var pie = d => d3.arc()
  .innerRadius(0)
  .outerRadius(r(d.total))
  .startAngle(d.pie.startAngle)
  .endAngle(d.pie.endAngle);

  var toCurrency = num => d3.format("0,.2f")(num);

  var drawAxis = (g, x, y, axis) => 
  g.attr("transform", `translate(${x},${y})`)
  .call(axis)
  .selectAll(".tick text")
  .attr("font-size", "9pt");

  const svg = d3.select("#playerdata")
  .attr("font-size", "10pt")
  .attr("cursor", "default")
  .attr("viewBox", [0, 0, width, height])
  .attr("stroke-width", 1.5);

  
  svg.append("rect")
  .attr('x',0)
      .attr('y', 0)
      .attr('width', width )
      .attr('height', height )
      .style('fill', "white")

const g = svg.selectAll(".pie")
  .data(chartData)
  .join("g")    
  .attr("class", "pie")
  .attr("transform", d => `translate(${x(d.age) + hx},${y(d.total)})`)
  .call(g => g.append("text")
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(0,${r(d.total)})`)
        .text(d => toCurrency(d.total))
        .text(d => d.name));


const pg = g.selectAll("g")
  .data(d => d3.pie()(d.values).map(p => ({pie: p, total: d.total})))
  .join("g")
  .call(g => g.append("title")
        .text((d, i) => `${skills[i]}\n${toCurrency(d.pie.value)} (${(d.pie.value / d.total * 100).toFixed(1)}%)`));


  
const slice = pg.append("path")
    .attr("d", d => pie(d)())
    .attr("opacity", 1)
    .attr("fill", (d, i) => color(skills[i]));

var legend;
function drawLegend(g) {
  legend = g.attr("transform", `translate(${width - margin.right},30)`)
    .selectAll("g")
    .data(skills)
    .join("g")
    .attr("transform", (d, i) => `translate(50,${i * 20})`)
    .call(g => g.append("rect")
          .attr("rx", 3).attr("ry", 3)
          .attr("width", 20).attr("height", 15)
          .attr("fill", d => color(d)))
    .call(g => g.append("text").attr("dx", 25).attr("alignment-baseline", "hanging").text(d => d))
    .on("mouseover", e => highlight(e))
    .on("mouseout", () => highlight());
}

svg.append("g").call(g => drawAxis(g, margin.left, 0, d3.axisLeft(y).ticks(height / 100, "s")));
svg.append("g").call(g => drawAxis(g, 0, height - margin.bottom, d3.axisBottom(x)));  
svg.append("g").call(drawLegend);

return svg.node();

function highlight(e) {
  const i = e ? legend.nodes().indexOf(e.currentTarget) : -1;    
  slice.transition().duration(500).attr("opacity", (d, j) => i === -1 || j === i ? 1 : 0.3);
}
}
export default pie;