import Chart from "./Chart";
import * as d3 from 'd3'

export default class PieChart extends Chart
{
    constructor()
    {
        super("pie_chart")
    }

    load()
    {
        super._generateData()
        
        const pie = d3.pie()
            .value((d) => d[1])

        const data_ready = pie(this._convertData())
        
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(300)

        this.experiment.svg
            .selectAll('pie')
            .data(data_ready)
            .join('path')
                .attr('d', arc)
                .attr('fill', 'white')
                .attr('stroke', 'black')
                .style('stroke-width', '2px')
                .attr("transform", "translate("+ this.experiment.sizes.centerX + "," + this.experiment.sizes.centerY + ")")

        
        //Adding Big Small Val Labels
        this.experiment.svg
            .selectAll('pie')
            .data(data_ready.filter((v,i) => (i==this.bigValLoc || i==this.smallValLoc)))
            .join('text')
                .text('*')
                .attr('transform', (d) => {
                    let arcCenter = arc.centroid(d)
                    return 'translate(' + (arcCenter[0] +  this.experiment.sizes.centerX) + "," + (arcCenter[1] + this.experiment.sizes.centerY) + ")"
                })
                .attr('fill', this.labelColor)
                .attr('font-size', this.labelSize)

    }

    _convertData()
    {
        let formattedData = []
        this.data.forEach((v,i) => {
            formattedData.push([i, v.value])
        })
        
        return formattedData
    }
}