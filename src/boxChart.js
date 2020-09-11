const fs = require('fs')
const D3Node = require('d3-node')
const d3 = require('d3')
const axis = require('d3-axis')
const scale = require('d3-scale')

function buildBoxChart( ) {
    const d3n = new D3Node()

    let margin = {top: 10, right: 30, bottom: 30, left: 40};
    let width = 300 - margin.left - margin.right;
    let height = 300 - margin.top - margin.bottom;
    const svg = d3n.createSVG(width, height);
// append the svg object to the body of the page
    svg .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// create dummy data
    const data = [12, 19, 11, 13, 12, 22, 13, 4, 15, 16, 18, 19, 20, 12, 11, 9];

// Compute summary statistics used for the box:
    let data_sorted = data.sort(d3.ascending);
    let q1 = d3.quantile(data_sorted, .25);
    let median = d3.quantile(data_sorted, .5);
    let q3 = d3.quantile(data_sorted, .75);
    let interQuantileRange = q3 - q1;
    let min = q1 - 1.5 * interQuantileRange;
    let max = q1 + 1.5 * interQuantileRange;

// Show the Y scale
    let y = d3.scaleLinear()
        .domain([0, 24])
        .range([height, 0]);
    svg.call(d3.axisLeft(y))
        .attr("stroke", "black")

// a few features for the box
    const center = 100;
    width = 100;

// Show the main vertical line
    svg
        .append("line")
        .attr("x1", center)
        .attr("x2", center)
        .attr("y1", y(min) )
        .attr("y2", y(max) )
        .attr("stroke", "black")

// Show the box
    svg
        .append("rect")
        .attr("x", center - width/2)
        .attr("y", y(q3) )
        .attr("height", (y(q1)-y(q3)) )
        .attr("width", width )
        .attr("stroke", "black")
        .style("fill", "#69b3a2")

// show median, min and max horizontal lines
    svg
        .selectAll("toto")
        .data([min, median, max])
        .enter()
        .append("line")
        .attr("x1", center-width/2)
        .attr("x2", center+width/2)
        .attr("y1", function(d){ return(y(d))} )
        .attr("y2", function(d){ return(y(d))} )
        .attr("stroke", "black")

    fs.writeFileSync('out.svg', d3n.svgString());
    return d3n.svgString();
}

buildBoxChart()

module.exports = {
   buildBoxChart
}