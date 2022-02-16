//This Javascript File is not attached to the index.html, as the same code below is in a <script> in the html file
//For some reason linking this file to the index breaks some of the code and I can't see why

  console.log(d3); // test if d3 is loaded
  width = 400;
  height = 450;
  howManyGraphs = 20;
  graphNum = 0;
  ids = new Array(howManyGraphs);
  results = new Array(howManyGraphs);
  charts = new Array(howManyGraphs);
  expected = new Array(howManyGraphs);
  page = d3.select('#page');
  
  document.getElementById('submittions').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('submit').click();
  });

  function getGraphIDs(howMany,max) {
    check = 1;
    counter = 0;
    for (let i = 0; i < howMany; i++) ids[i] = -1;
    while (counter < howMany){
      ids[counter] = Math.floor(Math.random() * max);
      for (let i = 0; i < ids.length; i++){
        if (i != counter) {
          if (ids[counter] == ids[i]) check = 0;
        }
      }
      if(check == 1) counter++;
      else check = 1;
    }
  }
  
  function drawG (data) {
    page.append('text').text((graphNum+1) + "/" + howManyGraphs);
    clean = (data[ids[graphNum]].data).substring(1, (data[ids[graphNum]].data).length-1).split(',');
    clean = clean.map(datapoint => Number(datapoint));
    if (charts[graphNum] == 0) {
      drawPie(clean, parseInt(data[ids[graphNum]].mark1), parseInt(data[ids[graphNum]].mark2));
    }
    else if (charts[graphNum] == 1) {
      drawBar(clean, parseInt(data[ids[graphNum]].mark1), parseInt(data[ids[graphNum]].mark2));
    }
    else if (charts[graphNum] == 2) {
      drawStack(clean, parseInt(data[ids[graphNum]].mark1), parseInt(data[ids[graphNum]].mark2));
    }
  }
  
  function drawPie (percents, m1, m2) {
    d3.select('svg').selectAll('*').remove();
    //marked = percents.filter(percent => (percents.indexOf(percent) == m1) || (percents.indexOf(percent) == m2));
    radius = 200;
    g = d3.select('svg')
      .append('g')
      .attr('transform','translate(200,225)');
    pie = d3.pie()
      .sort(null);
    arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    arcs = g.selectAll('arc')
      .data(pie(percents))
      .enter()
      .append('g')
      .attr('class','arc');
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .style('stroke-width', '1px');
    arcs.append('circle')
      .attr('transform', function(c) {
        c.innerRadius = 0;
        c.outerRadius = radius;
        return 'translate(' + arc.centroid(c) + ')';
      })
      .attr('r', function (d) {
        if(d.index == m1 || d.index == m2) return 3;
        else return 0;
      })
      .attr('stroke','black')
      .attr('stroke-width',2);
  }
  
  function drawBar (percents, m1, m2){
    d3.select('svg').selectAll('*').remove();
    
    xlen = 300/percents.length;
    xval = (-1) * xlen;
    counter = 0;
    mark1X = 0;
    mark1Y = 0;
    mark2X = 0;
    mark2Y = 0;
    
    tempI = new Array(percents.length);
    for(let i = 0; i < percents.length; i++) tempI[i] = i;
    g = d3.select('svg').append('g')
      .attr('transform', 'translate(50,50)');
    xScale = d3.scaleBand().range([0, 300]);
    yScale = d3.scaleLinear().range([350,0]);
    
    xScale.domain(tempI);
    yScale.domain([0, d3.max(percents, function(d) { return d })]);
    
    g.append('g')
      .attr('transform','translate(0,350)')
      .call(d3.axisBottom(xScale).ticks(percents.length));
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(0));
    
    g.selectAll('.bar')
      .data(percents)
      .enter()
      .append('rect')
      .attr('x', function(d) { 
        xval += xlen;
        if (counter == m1) {
          mark1X = xval + (xlen/2);
          mark1Y = yScale(d) + ((350 - yScale(d))/2);
        }
        if (counter == m2) {
          mark2X = xval + (xlen/2);
          mark2Y = yScale(d) + ((350 - yScale(d))/2);
        }
        counter++;
        return xval;
      })
      .attr('y', function(d) { return yScale(d); })
      .attr('width', xScale.bandwidth())
      .attr('height', function(d) { return 350 - yScale(d); })
      .attr('fill','white')
      .attr('stroke','black')
      .attr('stroke-width', 1);
    g.append('circle')
      .attr('cx', mark1X)
      .attr('cy', mark1Y)
      .attr('r', 3)
      .attr('stroke','black')
      .attr('stroke-width',2);
    g.append('circle')
      .attr('cx', mark2X)
      .attr('cy', mark2Y)
      .attr('r', 3)
      .attr('stroke','black')
      .attr('stroke-width',2);
  }
  
  function drawStack (percents, m1, m2){
    d3.select('svg').selectAll('*').remove();
    
    currY = ((-4) * percents[0]) + 25;
    lastY = percents[0];
    counter = 0;
    mark1Y = 0;
    mark2Y = 0;
    
    d3.select('svg').append('rect')
      .attr('x', 100)
      .attr('y', 25)
      .attr('height', 400)
      .attr('width', 200)
      .attr('fill','white')
      .attr('stroke','black')
      .attr('stroke-width',4);
    d3.select('svg').selectAll('.sq')
      .data(percents)
      .enter()
      .append('rect')
      .attr('x', 100)
      .attr('y', function(d) {
        currY += lastY*4;
        lastY = d;
     
        if (counter == m1) mark1Y = currY + d*2;
        if (counter == m2) mark2Y = currY + d*2;
        counter++;
      
        return currY;
      })
      .attr('width',200)
      .attr('height', function(d) {
        return d*4;
      })
      .attr('fill','white')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
    d3.select('svg').append('circle')
      .attr('cx', 200)
      .attr('cy', mark1Y)
      .attr('r', 3)
      .attr('stroke','black')
      .attr('stroke-width',2);
    d3.select('svg').append('circle')
      .attr('cx', 200)
      .attr('cy', mark2Y)
      .attr('r', 3)
      .attr('stroke','black')
      .attr('stroke-width',2);
  }
  
  d3.select('#agree')
    .on('click', function(){
      d3.select('#open').attr('class','hidden');
      d3.select('#graph').attr('class','');
      d3.csv('data.csv', function(data) {
        getGraphIDs(howManyGraphs,1000);
        
        for(let i = 0; i < howManyGraphs; i++) charts[i] = Math.floor(Math.random() * 3);
        for(let i = 0; i < howManyGraphs; i++) expected[i] = Math.floor(data[ids[i]].ratio);
        
        drawG(data);
      });
    });
  d3.select('#disagree')
    .on('click', function(){
      d3.select('#open').attr('class','hidden');
      d3.select('#closed').attr('class','');
    });
  d3.select('#submit')
    .on('click', function() {
      var g = document.getElementById('guess').value;
      results[graphNum] = g;
      if(results[graphNum] == '') d3.select('#warning').attr('class', '');
      else {
        page.select('text').remove();
        d3.select('#warning').attr('class', 'hidden');
        document.getElementById('guess').value = "";
        graphNum++;
        if(graphNum < howManyGraphs){
          d3.csv('data.csv', function(data) {
            drawG(data);
          });
        }
        else {
          console.log('Printing Results');
          logs();
          d3.select('#graph').attr('class','hidden');
          d3.select('#closed').attr('class','');
        }
      }
    });
  
  function logs () {
    d3.select('#ch').attr('class','')
      .append('text')
      .text("charts: " + charts.toString());
    console.log("charts: " + charts);
    d3.select('#gi').attr('class','')
      .append('text')
      .text("graph ids: " + ids.toString());
    console.log("graph ids: " + ids);
    d3.select('#ex').attr('class','')
      .append('text')
      .text("expected: " + expected.toString());
    console.log("expected: " + expected);
    d3.select('#in').attr('class','')
      .append('text')
      .text("Input: " + results.toString());
    console.log("Input: " + results);
  }
