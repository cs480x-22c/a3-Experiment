/////////////////////////////////////////////////////////////////////////////////
//
// Title:            Chart.js
// Semester:         Spring 2022
//
// Author:           Matthew Aguiar
// CS Login:         mcaguiar
// Lecturer's Name:  Lane Harrison
//
// Description:      This file contains the Chart class used to be extended off
//                   of by more specific charts.
//
/////////////////////////////////////////////////////////////////////////////////

class Chart
{
    constructor(data, horizontal, svg_width=400, svg_height=400)
    {
        //Instance Variables
        this.data = data;
        this.svg_width = svg_width;
        this.svg_height = svg_height;
        this.horizontal = horizontal;
        this.svg = null;
    }

    //The base drawing functions all charts use
    draw()
    {
        //Append an SVG to the Content Div
        this.svg = d3.select("body > #content").append("svg").attr("width", this.svg_width).attr("height", this.svg_height);
    }
}