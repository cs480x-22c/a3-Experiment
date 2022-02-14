class RandomPlots {

    constructor() {
        this.width = 700
        this.height = 700
        d3.select('#plot')
        .append('svg')
        .attr('height', this.height)
        .attr('width', this.width)
        .attr('id', 'content')
        this.initializeView = this.initializeView.bind(this)
    }

    initializeView() {
        d3.select('#content')
        .selectAll('*').remove()
        
        d3.select('#content')
        .append('rect')
        .attr('fill', 'lightgray')
        .attr('height', this.height)
        .attr('width', this.width)
        .attr('z-index', -1)
    }

    createBarChart(data) {
        this.initializeView()

        console.log(data);

        // x axis
        var x = d3.scaleBand()
                    .range([0, this.width])
                    .domain(data.map(function(d) { return d.Names }))
                    .padding(0.5)
        d3.select('#content')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
                .attr('transform', 'translate(-10,0)rotate(-45)')
                .style('text-anchor', 'end');

        // y axis
        var y = d3.scaleLinear().domain([0, this.height]).range()
        d3.select('#content').call(d3.axisLeft(y))

        // make da bars
        d3.select('#content')
            .selectAll('None')
            .data(data)
            .append('rect')
            .attr('x', function(d) { return x(d.xValues) })
            .attr('y', function(d) { return y(d.yValues) })
            .attr('width')
            .attr('height')
            .attr('fill', '#4c34eb')
    }


    createPieChart(data) {
        // Developed based on https://www.d3-graph-gallery.com/graph/pie_basic.html
        this.initializeView()
        // Set color palette
        console.log(data);
            
        var pieData = d3.pie().value( d=>d.value)(data);
        console.log(pieData)

        d3.select('#content').selectAll('None')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(this.width  * 0.3)
        )
        .attr('fill', function(d){ return(d.data.color) })
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)    
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    }

    createCircles(data) {
        this.initializeView()
        let radius = Math.min(this.width, this.height) / 6 / 2

        d3.select('#content')
        .selectAll('circle').data(data)
        .enter()
        .append('circle')
        .attr('r', radius)
        .attr('cx', (_, i) => (2 + (i*2)) * 2*radius)
        .attr('cy', this.height / 2)
        .attr('fill', c => c)
    }
}
