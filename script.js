let results = [];

function drawStartPage() {
    const container = d3.select("#container");

    const text1 = "In this experiment, you are asked to judge what percent\
    a smaller region is of a larger region in several charts. We won't record\
    any information from you except your answers."
    const text2 = "Click Agree to begin.";
    const text3 = "Thank you!";

    container.append("p")
        .text(text1);
    container.append("p")
        .text(text2);
    container.append("p")
        .text(text3);

    container.append("div")
        .attr("id", "button-div");
    const buttonDiv = d3.select("#button-div");

    buttonDiv.append("button")
        .text("Disagree")
        .attr("id", "disagree-button");
    buttonDiv.append("button")
        .text("Agree")
        .attr("id", "agree-button");

    d3.select("#disagree-button").on("click", e => {
        drawEndPage();
    });

    d3.select("#agree-button").on("click", e => {
        d3.csv("data.csv")
            .then(d => drawGraphPage(d));
    });
}

function drawGraphPage(d) {
    console.log(d);
    const container = d3.select("#container");
    container.html("");

    container.append("svg")
        .attr("width", width)
        .attr("height", height);
}

function drawGraph(id, data, mark1, mark2) {
    if (id.includes("bar")) {
        drawBarChart(data, mark1, mark2);
    }
    else if (id.includes("pie")) {
        drawPieChart(data, mark1, mark2);
    }
    else if (id.includes("bubble")) {
        drawBubbleChart(data, mark1, mark2);
    }
}

function drawEndPage() {
    const container = d3.select("#container");
    container.html("");

    const text1 = "Thank you for participating!";

    container.append("p")
        .text(text1);
    console.log(results);
}

drawStartPage();