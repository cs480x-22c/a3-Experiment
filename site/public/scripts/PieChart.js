/////////////////////////////////////////////////////////////////////////////////
//
// Title:            PieChart.js
// Semester:         Spring 2022
//
// Author:           Matthew Aguiar
// CS Login:         mcaguiar
// Lecturer's Name:  Lane Harrison
//
// Description:      This file contains the PieChart class used to take data
//                   and draw pie charts out of them.
//
/////////////////////////////////////////////////////////////////////////////////

class PieChart extends Chart
{
    constructor(data, horizontal, svg_width, svg_height)
    {
        super(data, horizontal, svg_width, svg_height);
        this.pie_radius = Math.min(this.svg_width, this.svg_height) / 3;
    }

    draw()
    {
        //Local Variables
        let pie_group, pie, arc, arcs;

        //Call Parent Draw
        super.draw();

        //Add Group to Group Pie Elements Together
        pie_group = this.svg.append("g").attr("transform", "translate(" + this.svg_width / 2 + "," + this.svg_height / 2 + ")");

        //Build Plot
        pie = d3.pie().sort(null);
        arc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.pie_radius);

        arcs = pie_group.selectAll("arc")
            .data(pie(this.data.points.map(element => element.value)))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("value", element => element.value);

        arcs.append("path")
            .attr("fill", function (d, i) {
                return "#FFFFFF";
            })
            .attr("d", arc);

        //Append Circles to All Arcs (Only Fill Two)
        let arc_array = arcs._groups[0];
        for(let i = 0, found = 0, start_angle, end_angle, circle; i < arc_array.length; i++)
        {
            if(arc_array[i].getAttribute("value") == this.data.points[this.data.element1_index].value ||
                arc_array[i].getAttribute("value") == this.data.points[this.data.element2_index].value)
            {
                //Create Circle
                circle = document.createElementNS(SVGNS,"circle");
                circle.setAttribute("r", "3");

                //Calculate Angles
                start_angle = arc_array[i].__data__.startAngle;
                end_angle = arc_array[i].__data__.endAngle;

                circle.setAttribute("cx",
                    (this.pie_radius/1.5 * Math.cos(start_angle + (end_angle - start_angle)/2 - Math.PI/2)).toString());
                circle.setAttribute("cy",
                    (this.pie_radius/1.5 * Math.sin(start_angle + (end_angle - start_angle)/2 - Math.PI/2)).toString());
                arc_array[i].append(circle);
                found++;
                if(found >= 2) //Only allow two arcs to be selected because the array may contain duplicate values!!
                    break;
            }
        }
    }
}