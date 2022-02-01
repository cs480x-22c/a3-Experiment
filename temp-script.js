function drawPieChart(data, mark1, mark2) {
    const cx = 200;
    const cy = 200;
    const r = 150;

    //draw border
    d3.select("svg")
        .append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    //calculate angles
    sum = data.reduce((a, b) => a + b, 0);
    current = 270; //starting angle
    //current = Math.floor(Math.random() * 360); //random starting angle

    //iterate through data, calculate angles, and draw lines
    data.forEach((d, idx) => {
        angle = 360 * d / sum;
        current += angle;
        if (current >= 360) 
            current -= 360;

        if (idx == mark1 || idx == mark2)
            markSector(cx, cy, r, current, angle);

        coords = getCoordinates(cx, cy, r, current);
        drawPieChartLine(cx, cy, coords.x, coords.y);
    });
    
}

function drawPieChartLine(x1, y1, x2, y2) {
    d3.select("svg")
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
}

//draw small circle on sector
function markSector(cx, cy, radius, current, angle) {
    console.log("in here");
    markAngle = current - (angle / 2);
    coords = getCoordinates(cx, cy, radius / 2, markAngle);
    d3.select("svg")
        .append("circle")
        .attr("cx", coords.x)
        .attr("cy", coords.y)
        .attr("r", 3)
        .attr("fill", "black");
}

//returns cartesian coordinates
function getCoordinates(cx, cy, radius, angle) {
    angle = angle * Math.PI / 180; //convert to radians
    x = radius * Math.cos(angle) + cx;
    y = radius * Math.sin(angle) + cy;
    return {x, y};
}

drawPieChart([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1, 7);