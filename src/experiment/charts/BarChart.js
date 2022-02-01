import Chart from "./Chart";
import * as d3 from 'd3'
import { range, svg } from "d3";

export default class RadialBarChart extends Chart
{
    constructor()
    {
        super("bar_chart")
        this._barHeight = 500
        this._barWidth = 20
        this._barSpacing = 20
    }

    load()
    {
        super._generateData()            

        let x = d3.scaleBand()
            .domain(d3.range(this.data.length ))
            .range([0, this.experiment.sizes.width])
            .padding(0.1)

        let y = d3.scaleLinear()
        .domain([0, 100])
        .range([this.experiment.sizes.height, 0])


        this.experiment.svg.append('g')
        .attr('stroke', 'black')
        .attr('stroke-width', "1px")
        .attr('fill', "white")
        .selectAll('rect')
        .data(this.data)
        .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            
        this.experiment.svg
            .selectAll('labels')
            .data([this.bigValLoc, this.smallValLoc])
            .join('text')
            .attr('x', (i) => x(i) + x.bandwidth()/2 - 10) 
            .attr('y', 790)
            .text("*")
            .attr('font-size', 40)
            .attr('fill', 'red')
    }
}