import Chart from "./Chart";
import * as d3 from 'd3'

export default class RadialBarChart extends Chart
{
    constructor()
    {
        super("radial_bar_chart")

        this._arcWidth = 20
        this._arcSpacing = 20
        this._startRadius = 40
    }
    
    load()
    {
        super._generateData()            
        
        this.experiment.svg
            .selectAll('arcs')
                .data(this.data)
                .join('path')
                .attr('d', d3.arc().innerRadius((d, i) => this._startRadius + this._arcSpacing * i + this._arcWidth * i)
                                    .outerRadius((d, i) => this._startRadius + this._arcWidth * (i+1) + this._arcSpacing * i)
                                    .startAngle(0)
                                    .endAngle((d) => (Math.PI*2) * d.value/100))
                .attr('stroke', 'black')
                .attr('stroke-width', "2px")
                .attr('fill', 'white')
                .attr("transform", "translate("+ this.experiment.sizes.centerX + "," + this.experiment.sizes.centerY + ")")
        
        this.experiment.svg
            .selectAll('labels')
            .data([this.bigValLoc, this.smallValLoc])
            .join('text')
            .attr('x', 0)
            .attr('y', (i) => -(this._startRadius + this._arcSpacing * i + this._arcWidth * i - 10))
            .text("*")
            .attr('fill', 'red')
            .attr('font-size', 40)
            .attr("transform", "translate("+ this.experiment.sizes.centerX + "," + this.experiment.sizes.centerY + ")")
    }
    
    _generateArc(dataVal, dataLoc)
    {
        let innerRadius = this._startRadius + this._arcSpacing * dataLoc + this._arcWidth * (dataLoc)
        let outerRadius = this._startRadius + this._arcWidth * (dataLoc+1) +  this._arcSpacing * dataLoc;

        let arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle((Math.PI * 2) * (dataVal/100))

        return arc
            
    }
}