const fs = require('fs')
const D3Node = require('d3-node')
const d3 = require('d3')
const axis = require('d3-axis')
const scale = require('d3-scale')

let data = [{
    "count": "1000",
    "min": "1.6",
    "max": "4.1",
    "label": "A",
    "stddev": "0.72",
    "mean": "3.1"
}, {
    "count": "2000",
    "min": "1.1",
    "max": "2.9",
    "label": "B",
    "stddev": "0.72",
    "mean": "2.2"
}, {
    "count": "3000",
    "min": "2.4",
    "max": "3.6",
    "label": "C",
    "stddev": "0.72",
    "mean": "3.1"
},
    {
        "count": "4000",
        "min": "2.4",
        "max": "3.6",
        "label": "DBQ1",
        "stddev": "0.72",
        "mean": "3.1"
    },
    {
        "count": "5000",
        "min": "2.4",
        "max": "5.6",
        "label": "DRB1",
        "stddev": "0.72",
        "mean": "3.1"
    }
];

function buildGroupBoxChart() {
    const d3n = new D3Node()

    let margin = {top: 10, right: 30, bottom: 30, left: 40};
    let width = 550 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    const svg = d3n.createSVG(width, height);

    let data_sorted = data.sort(d3.ascending);
    let q1 = d3.quantile(data_sorted, .25);
    let median = d3.quantile(data_sorted, .5);
    let q3 = d3.quantile(data_sorted, .75);
    let interQuantileRange = q3 - q1;
    let min = q1 - 1.5 * interQuantileRange;
    let max = q1 + 1.5 * interQuantileRange;

    let w = 500,
        h = 300,
        padding = 30,
        padding2 = 20;

    svg.append("svg")
        .attr("width", w)
        .attr("height", h);

    let yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([h - padding2, 10])

    let xScale = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.label
        }))
        .range([padding, w - padding])
        .padding(0.4);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + (h - padding2) + ")")
        .attr("stroke", "black")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .attr("stroke", "black")
        .call(yAxis.ticks(5));
    svg.append("g")
        .style("color", "rgb(204, 204, 204)")
        .call(yAxis.ticks(5).tickSizeInner(-width).tickFormat(() => ""))
        .select(".domain").remove()

    svg.selectAll("vertLines") //mustaches
        .data(data)
        .enter()
        .append("line")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("x1", function (d) {
            return xScale(d.label) + 25
        })
        .attr("x2", function (d) {
            return xScale(d.label) + 25
        })
        .attr("y1", function (d) {
            return yScale(d.min)+ 20
        })
        .attr("y2",function (d) {
            return yScale(d.max)
        })


    svg.selectAll("foo") //boxes
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "#69b3a2")
        .attr("stroke", "black")
        .attr("x", function (d) {
            return xScale(d.label)
        })
        .attr("width", xScale.bandwidth())
        .attr("y", function (d) {
            return yScale(d.max)
        })
        .attr("height", function (d) {
            return yScale(d.min) - yScale(d.max)
        });

    svg.selectAll("foo") // horizontal line
        .data(data)
        .enter()
        .append("line")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("x1", function (d) {
            return xScale(d.label)
        })
        .attr("x2", function (d) {
            return xScale(d.label) + xScale.bandwidth()
        })
        .attr("y1", function (d) {
            return yScale(d.mean)
        })
        .attr("y2", function (d) {
            return yScale(d.mean)
       });




    fs.writeFileSync('out2.svg', d3n.svgString());
    return d3n.svgString();
}
//)}
buildGroupBoxChart()
module.exports = {
    buildGroupBoxChart
}