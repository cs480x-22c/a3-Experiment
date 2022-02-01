import Graph from "./Graph";
import * as d3 from 'd3'
import { thresholdScott } from "d3";

const ARC_WIDTH = 20
const ARC_SPACING = 20
const START_RADIUS = 50 

export default class RadialBarChart extends Graph
{
    constructor()
    {
        super("radial_bar_chart")
    }

    load()
    {
        super._generateData()            
        
        this.experiment.svg
            .selectAll('arcs')
                .data(this.data)
                .join('path')
                .attr('d', d3.arc().innerRadius((d, i) => START_RADIUS + ARC_SPACING * i + ARC_WIDTH * i)
                                    .outerRadius((d, i) => START_RADIUS + ARC_WIDTH * (i+1) + ARC_SPACING * i)
                                    .startAngle(0)
                                    .endAngle((d) => (Math.PI*2) * d.value/100))
                .attr('stroke', 'black')
                .attr('stroke-width', "2px")
                .attr('fill', 'white')
                .attr('text', "test")
                .attr("transform", "translate("+ this.experiment.sizes.centerX + "," + this.experiment.sizes.centerY + ")")
        
        this.experiment.svg
            .selectAll('labels')
            .data([this.bigValLoc, this.smallValLoc])
            .join('text')
            .attr('x', 0)
            .attr('y', (i) => -(START_RADIUS + ARC_SPACING * i + ARC_WIDTH * i + 2))
            .text("*")
            .attr('fill', 'red')
            .attr("transform", "translate("+ this.experiment.sizes.centerX + "," + this.experiment.sizes.centerY + ")")
    }
    
    _generateArc(dataVal, dataLoc)
    {
        let innerRadius = START_RADIUS + ARC_SPACING * dataLoc + ARC_WIDTH * (dataLoc)
        let outerRadius = START_RADIUS + ARC_WIDTH * (dataLoc+1) +  ARC_SPACING * dataLoc;

        console.log(innerRadius + " " + outerRadius)
        let arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle((Math.PI * 2) * (dataVal/100))

        return arc
            
    }
}