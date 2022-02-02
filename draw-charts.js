const width = 500;
const height = 500;

//--------------------Pie Chart--------------------
function drawPieChart(data, mark1, mark2) {
    const cx = 250;
    const cy = 250;
    const r = 150;

    const svg = d3.select("svg");

    //draw border
    svg.append("circle")
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
    const svg = d3.select("svg");

    svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
}

//draw small circle on sector
function markSector(cx, cy, radius, current, angle) {
    const svg = d3.select("svg");

    markAngle = current - (angle / 2);
    coords = getCoordinates(cx, cy, radius / 2, markAngle);
    svg.append("circle")
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
    return { x, y };
}

//--------------------Bubble Chart--------------------

function drawBubbleChart(nums, mark1, mark2) {
    const svg = d3.select("svg");

    const n = 10;
    var cx = [];
    var sum = nums[0];
    for (var i = 0; i < nums.length; i++) {
        sum = sum + n * ((nums[i] / Math.PI) ** 0.5);
        cx.push(sum);
        sum = sum + n * ((nums[i] / Math.PI) ** 0.5) + 10;
    }

    var scaleX = d3.scaleLinear()
        .domain([0, 350])
        .range([0, width - 100]);

    var x = d3.axisBottom()
        .scale(scaleX);

    var scaleY = d3.scaleLinear()
        .domain(0, nums.length * 20)
        .range(height - 100, 40);

    var y = d3.axisLeft()
        .scale(scaleY);

    svg.append("g")
        .attr("transform", "translate(40," + (height - 100) + ")");

    svg.append("g")
        .attr("transform", "translate(40,0)");

    var count = 0;
    svg.append("g")
        .selectAll("dot")
        .data(nums)
        .enter()
        .append("circle")
        .attr("cx", function () {
            var c = cx[count];
            count++;
            return c;
        })
        .attr("cy", 150)
        .attr("r", function (d) { return n * ((d / Math.PI) ** 0.5); })
        .style("fill", "white")
        .style("stroke", "black");

    svg.append("circle")
        .attr("cx", function () {
            return cx[mark1];
        })
        .attr("cy", 150)
        .attr("r", 3);

    svg.append("circle")
        .attr("cx", function () {
            return cx[mark2];
        })
        .attr("cy", 150)
        .attr("r", 3);

}

//--------------------Bar Chart--------------------

function drawBarChart(nums, mark1, mark2) {
    const svg = d3.select("svg");

    var xVals = [];
    var sum = 40;
    var rectWidth = 15;
    const m = 5;
    var maxNum = 0;
    for (var i = 0; i < nums.length; i++) {
        sum += rectWidth;
        xVals.push(sum);
        sum += rectWidth;
        if (nums[i] > maxNum) {
            maxNum = nums[i]
        }
    }

    var scaleX = d3.scaleLinear()
        .domain([0, width])
        .range([0, 35 * nums.length]);

    var x = d3.axisBottom()
        .scale(scaleX);

    var scaleY = d3.scaleLinear()
        .domain([0, maxNum * m])
        .range([height - 100, 40]);

    var y = d3.axisLeft()
        .scale(scaleY);

    svg.append("g")
        .attr("transform", "translate(40," + (height - 100) + ")")
        .call(x.ticks(0));

    svg.append("g")
        .attr("transform", "translate(40,0)")
        .call(y.ticks(0));

    var count = 0;
    svg.selectAll("mybar")
        .data(nums)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            n = xVals[count];
            count++;
            return n;
        })
        .attr("y", function (d) {
            return scaleY(d * m);
        })
        .attr("width", rectWidth)
        .attr("height", function (d) {
            return height - 100 - scaleY(d * m);
        })
        .style("fill", "white")
        .style("stroke", "black");

    svg.append("circle")
        .attr("cx", function () {
            return xVals[mark1] + 7.5;
        })
        .attr("cy", height - 105)
        .attr("r", 3);

    svg.append("circle")
        .attr("cx", function () {
            return xVals[mark2] + 7.5;
        })
        .attr("cy", height - 105)
        .attr("r", 3);
}