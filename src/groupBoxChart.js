const fs = require('fs')
const D3Node = require('d3-node')
const d3 = require('d3')
const boxPlotData = require('./boxChart')

let boxPlotdata = [10, 15, 30, 45, 5, 20, 32, 8, 12]
let boxPlotdata1 = [15, 15, 35, 47, 10, 27, 37, 9, 13]
let boxPlotdata2 = [16, 15, 30, 45, 9, 24, 32, 8, 15]
let boxPlotdata3 = [11, 15, 31, 45, 5, 20, 32, 8, 17]
let boxPlotdata4 = [13, 15, 33, 46, 8, 21, 33, 9, 18]

let data = [{
        key: "A",
        value: boxPlotData.calculateBoxPlotData(boxPlotdata)
    },
    {
        key: "B",
        value:  boxPlotData.calculateBoxPlotData(boxPlotdata1)
    },
    {
        key: "C",
        value:  boxPlotData.calculateBoxPlotData(boxPlotdata2)
    },
    {
        key: "DBQ1",
        value:  boxPlotData.calculateBoxPlotData(boxPlotdata3)
    },
    {
        key: "DRB1",
        value:  boxPlotData.calculateBoxPlotData(boxPlotdata4)
    }
]
function buildGroupBoxChart(data) {

    const d3n = new D3Node()

    // sizes for svg
    let margin = {top: 10, right: 30, bottom: 30, left: 40}
    let width = 850 - margin.left - margin.right
    let height = 500 - margin.top - margin.bottom

    const svg = d3n.createSVG(width, height)

    // sizes for plots
    let plotWidth = 500,
        plotHeigth = 300,
        xPadding = 30,
        yPadding = 20;

    let yScale = d3.scaleLinear()
        .domain([0, 50]) // сюда передать значение max + offset
        .range([plotHeigth - yPadding, 10])

    let xScale = d3.scaleBand()
        .domain(data.map(function (d) {
           return d.key
       }))
        .range([30, plotWidth - xPadding])
         .padding(0.4)

    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)

    svg.append("g")
        .attr("transform", "translate(" + xPadding + ",0)")
        .attr("stroke", "black")
        .call(yAxis.ticks(5))

    svg.append("g")
        .style("color", "rgb(204, 204, 204)")
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(yAxis.ticks(5).tickSizeInner(-width+ 340).tickFormat(() => ""))
        .select(".domain").remove()

    svg.append("g")
        .attr("transform", "translate(0," + (plotHeigth - yPadding) + ")")
        .attr("stroke", "black")
        .call(xAxis.ticks(5));
    let boxWidth = 50

    svg  .selectAll("vertLines")      //mustaches
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return xScale(d.key) + 25
        })
        .attr("x2", function (d) {
            return xScale(d.key) + 25
        })
        .attr("y1",function (d) {
            return yScale(d.value.min)
        })
        .attr("y2",function (d) {
            return yScale(d.value.max)
        })
        .attr("stroke", "black")

    svg .selectAll("boxes")//boxes
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return xScale(d.key)
        })
        .attr("y",  function (d) {
            return yScale(d.value.q3)
        })
        .attr("width", boxWidth)
        .attr("height", function (d) {
            return yScale(d.value.q1)- yScale(d.value.q3)
        })
        .attr("fill", "#BDBDBD")
        .attr("stroke", "black")


    svg
        .selectAll("medianLines")// horizontal line
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return xScale(d.key)})
        .attr("x2", function (d) {
            return xScale(d.key) + 50})
        .attr("y1", function (d) {
            return yScale(d.value.median)
        })
        .attr("y2", function (d) {
            return yScale(d.value.median)
        })
        .attr("stroke", "black")
        .attr("width", 80)

    svg
        .selectAll("medianLines")// horizontal line
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return xScale(d.key)})
        .attr("x2", function (d) {
            return xScale(d.key) + 50})
        .attr("y1", function (d) {
            return yScale(d.value.max)
        })
        .attr("y2", function (d) {
            return yScale(d.value.max)
        })
        .attr("stroke", "black")
        .attr("width", 80)

    svg
        .selectAll("medianLines")// horizontal line
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return xScale(d.key)})
        .attr("x2", function (d) {
            return xScale(d.key) + 50})
        .attr("y1", function (d) {
            return yScale(d.value.min)
        })
        .attr("y2", function (d) {
            return yScale(d.value.min)
        })
        .attr("stroke", "black")
        .attr("width", 80)


    fs.writeFileSync('out1.svg', d3n.svgString());
    return d3n.svgString();
}

buildGroupBoxChart(data)

module.exports = {
    buildGroupBoxChart
}