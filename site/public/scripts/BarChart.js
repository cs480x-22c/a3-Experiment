/////////////////////////////////////////////////////////////////////////////////
//
// Title:            BarChart.js
// Semester:         Spring 2022
//
// Author:           Matthew Aguiar
// CS Login:         mcaguiar
// Lecturer's Name:  Lane Harrison
//
// Description:      This file contains the BarChart class used to take data
//                   and draw bar charts out of them.
//
/////////////////////////////////////////////////////////////////////////////////

class BarChart extends Chart
{
    constructor(data, horizontal, svg_width, svg_height, svg_margin=200)
    {
        super(data, horizontal, svg_width, svg_height);
        this.svg_margin = svg_margin;
    }

    draw()
    {
        //Local Variables
        let svgScaledWidth, svgScaledHeight, xScale, yScale, chart_group;

        //Call on Parent Draw Function
        super.draw();

        //Apply Margin to Dimensions
        svgScaledWidth = this.svg_width - this.svg_margin;
        svgScaledHeight = this.svg_height - this.svg_margin;

        //Setup Charts x and y Scales
        xScale = d3.scaleBand().range([0, svgScaledWidth]).padding(0.4);
        yScale = d3.scaleLinear().range ([svgScaledHeight, 0]);
        xScale.domain(this.data.points.map(element => element.index));
        yScale.domain([0, d3.max(this.data.points, element => element.value)]);

        //Create the Main Chart Grouping
        chart_group = this.svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")")
        if(this.horizontal === true)
            chart_group.attr("transform", "rotate(90, 100, 200)");

        //Setup x Axis Group
        chart_group.append("g")
            .attr("transform", "translate(0," + svgScaledHeight + ")")
            .call(d3.axisBottom(xScale));

        //Setup y Axis Group
        chart_group.append("g")
            .call(d3.axisLeft(yScale).tickFormat(data => data).ticks(10))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("value");

        //Add the Rectangles
        chart_group.selectAll(".bar")
            .data(this.data.points)
            .enter().append("g")
            .attr("class", "rect-class")
            .attr("value", element => element.value)
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(d.index); })
            .attr("y", function(d) { return yScale(d.value); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return svgScaledHeight - yScale(d.value); });

        let bar_array = chart_group.selectAll("g.rect-class")._groups[0];
        for(let i = 0, found = 0, circle; i < bar_array.length; i++)
        {
            if(bar_array[i].getAttribute("value") == this.data.points[this.data.element1_index].value ||
                bar_array[i].getAttribute("value") == this.data.points[this.data.element2_index].value)
            {
                //Create Circle
                circle = document.createElementNS(SVGNS,"circle");
                circle.setAttribute("r", "3");

                //Get Info about Bars
                let rect, x, y, width, height;
                rect = bar_array[i].children[0];
                x = parseFloat(rect.getAttribute("x"));
                y = parseFloat(rect.getAttribute("y"));
                width = parseFloat(rect.getAttribute("width"));
                height = parseFloat(rect.getAttribute("x"));
                circle.setAttribute("cx", (x + width/2).toString());
                circle.setAttribute("cy", (y + 10).toString());
                bar_array[i].append(circle);
                found++;
                if(found >= 2) //Only allow two rectangles to be selected because the array may contain duplicate values!!
                    break;
            }
        }
    }
}