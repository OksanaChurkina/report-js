const fs = require('fs')
const D3Node = require('d3-node')
const d3 = require('d3')

function calculateBoxPlotData(data) {
    const locusData = data.sort(d3.ascending)
    const q1 = d3.quantile(locusData, .25)
    const median = d3.quantile(locusData, .5)
    const q3 = d3.quantile(locusData, .75)
    const interQuantileRange = q3 - q1
    const min = locusData[0]
    const max = locusData[locusData.length - 1]
    const a = {q1, median, q3, interQuantileRange, min, max}
    return a
}

function buildBoxChart( ) {
    const d3n = new D3Node()

    //sizes for svg
    let margin = {top: 10, right: 30, bottom: 30, left: 40}
    let width = 220 - margin.left - margin.right
    let height = 220 - margin.top - margin.bottom
    const svg = d3n.createSVG(width, height)

// append the svg object to the body of the page
    svg .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    const data = [12, 19, 11, 13, 12, 22, 13, 4, 15, 16, 18, 19, 20, 12, 11, 9]

  const box = calculateBoxPlotData(data)

    let x = d3.scaleBand()
        .domain([])
        .range([15, width])
        .padding([0.8])                          // Goes between 0 and 1. Default is 0

// Draw the axis
    svg.append("g")
        .attr("transform", "translate(15,259)")      // This controls the vertical position of the Axis
        .attr("stroke", "black")
        .call(d3.axisBottom(x))

// Show the Y scale
    let y = d3.scaleLinear()
        .domain([0, 24])
        .range([height, 0])


    svg.append("g")
        .attr("transform", "translate(30,15)")      // This controls the vertical position of the Axis
        .attr("stroke", "black")
        .call(d3.axisLeft(y).ticks(5))

// show grid
    svg.append("g")
        .style("color", "rgb(204, 204, 204)")
        .attr("transform", "translate(30,15)")
        .call(d3.axisLeft(y).ticks(5).tickSizeInner(-width).tickFormat(() => ""))
        .select(".domain").remove()


// a few features for the box
    const center = width/2 + 20;
    let boxWidth = 100;

//Show the main vertical line
    svg
        .append("line")
        .attr("x1", center)
        .attr("x2", center)
        .attr("y1", y(box.min) )
        .attr("y2", y(box.max) )
        .attr("stroke", "black")

// Show the box
    svg
        .append("rect")
        .attr("x", center - boxWidth/2)
        .attr("y", y(box.q3) )
        .attr("height", (y(box.q1)-y(box.q3)) )
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#BDBDBD")

// show median, min and max horizontal lines
    svg
        .selectAll("toto")
        .data([box.min, box.median, box.max])
        .enter()
        .append("line")
        .attr("x1", center - boxWidth/2)
        .attr("x2", center + boxWidth/2)
        .attr("y1", function(d){ return(y(d))} )
        .attr("y2", function(d){ return(y(d))} )
        .attr("stroke", "black")

    fs.writeFileSync('out.svg', d3n.svgString());
    return d3n.svgString();
}

buildBoxChart()

module.exports = {
   buildBoxChart,
   calculateBoxPlotData
}