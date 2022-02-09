console.log(d3);
// Random Dataset
var data = d3.range(10).map(function() {
    return Math.random(100) ;
});

var point1 = data[Math.floor(Math.random(10) * 10)];
var point2 = data[Math.floor((Math.random(10)) * 10)];

while (point1 == point2){
    point2 = data[Math.floor((Math.random(10)) * 10)]
}

console.log(data);
console.log(point1);
console.log(point2);


function generateGraph(){
    // Display data
    var svg = d3.select('#chartholder').selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style('height', function (d) { return d * 400 + 'px';})
        .style('background-color', function(d){ if(d == point1 || d == point2){ return "black"}});
}

//get percentage input
var results = [];
var percentage = Math.floor(100- (Math.min(point1, point2) / Math.max(point1, point2)) * 100);
var trial = (Math.random(10) * 10);

function calcInput() {
    var input = document.getElementById("userInput").value;
    results.push({name: "barchart1", input: input, value: percentage, id: trial});
    console.log(results); 
    console.log(results.length); 
    window.localStorage.setItem("trial: ", JSON.stringify(results));
    return results;
}

function sendInput() {
    
    obj =  window.localStorage.getItem("trial: ");
    console.log(obj);
        // var str = "ID:" + obj[0].id + "\nName: "
        //       + obj.name + "\nValue:" + obj.value 
        //       + "\nType: " + obj.type;

        //  console.log(str);

        
  let liLast = document.createElement('li');
  ol.append(liLast);
  liLast.innerHTML = obj;
 

    }
