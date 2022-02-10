const container = d3.select("#container");
const path = "data.csv";
let results = []; //store results
let order; //random order to display charts
let counter = 0; //what graph we are on

function drawStartPage() {
    //add text
    const text1 = "In this experiment, you are asked to judge what percent\
    a smaller region is of a larger region in several charts. Make a quick\
    visual judgement and do not try to make measurements. We won't record\
    any information from you except your answers."
    const text2 = "Click Agree to begin.";
    const text3 = "Thank you!";
    container.append("p")
        .text(text1);
    container.append("p")
        .text(text2);
    container.append("p")
        .text(text3);

    //add buttons
    container.append("div")
        .attr("id", "form-div");
    const formDiv = d3.select("#form-div");

    formDiv.append("button")
        .text("Disagree")
        .attr("id", "disagree-button");
    formDiv.append("button")
        .text("Agree")
        .attr("id", "agree-button");

    d3.select("#disagree-button").on("click", e => {
        drawEndPage();
    });

    d3.select("#agree-button").on("click", e => {
        d3.csv(path)
            .then(d => drawGraphPage(d));
    });
}

function drawGraphPage(data) {
    order = shuffle(data.length);

    //clear screen
    container.html("");

    //add progress bar
    container.append("div")
        .attr("id", "progress-div");
    const progressDiv = d3.select("#progress-div");
    progressDiv.append("svg")
        .attr("width", width / 2)
        .attr("height", 15)
        .attr("id", "progress-bar");
    progressDiv.append("span")
        .attr("id", "progress-text");
    updateProgressBar(counter + 1, data.length);

    //add svg and draw first graph
    container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "graph-svg");
    let d = data[order[counter]];
    drawGraph(d.id, stringToArray(d.nums), d.mark1, d.mark2);

    //add text
    const text1 = "Two values are marked with dots. What percent do you think\
    the smaller value is of the larger value? Please put your answer below.";
    const text2 = "For example if you think the smaller one is exactly half of\
    the bigger one, input 50.";
    container.append("p")
        .text(text1);
    container.append("p")
        .text(text2);

    //add form
    container.append("form")
        .attr("id", "form-div");
    const formDiv = d3.select("#form-div");

    formDiv.append("input")
        .attr("type", "text")
        .attr("id", "input-box")
        .attr("autocomplete", "off");

    formDiv.append("button")
        .text("Next")
        .attr("id", "next-button");

    d3.select("#form-div").on("submit", e => {
        e.preventDefault();

        let inputValue = d3.select("#input-box").node().value.trim();
        if (inputValue != "") { //replace with true to ignore check
            //clear input field and store result
            d3.select("#input-box").node().value = "";
            results.push({ id: d3.select("#graph-svg").attr("data-id"), response: inputValue });

            //draw next graph or go to end page
            if (counter < data.length - 1) {
                counter++;
                updateProgressBar(counter + 1, data.length);
                d = data[order[counter]];
                drawGraph(d.id, stringToArray(d.nums), d.mark1, d.mark2);
            }
            else {
                drawEndPage();
            }
        }
    });
}

function updateProgressBar(part, whole) {
    let barWidth = (width / 2 / whole) * part;
    const bar = d3.select("#progress-bar");
    bar.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width / 2)
        .attr("height", 15)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    bar.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", barWidth)
        .attr("height", 15)
        .attr("fill", "black");
        d3.select("#progress-text").text(`${part}/${whole}`);
}

function drawGraph(id, data, mark1, mark2) {
    d3.select("#graph-svg").html("");
    d3.select("#graph-svg")
        .attr("data-id", id);
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
    //clear screen
    container.html("");

    //draw text
    const text1 = "Thank you for participating!";
    container.append("p")
        .text(text1);

    //log results to console
    console.log(results);
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(length) {
    let array = [], i;
    for (i = 0; i < length; i++) {
        array.push(i);
    }

    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function stringToArray(string) {
    string = string.substring(1, string.length - 1); //remove brackets
    array = string.split(","); //split on comma
    array = array.map(d => Number(d)); //convert to number
    return array;
}

drawStartPage();