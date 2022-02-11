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
        .selectAll("*").remove()
        
        d3.select('#content')
        .append('rect')
        .attr('fill', 'lightgray')
        .attr('height', this.height)
        .attr('width', this.width)
        .attr('z-index', -1)
    }

    createBarChart() {
    }


    createPieChart(data) {
        // Developed based on https://www.d3-graph-gallery.com/graph/pie_basic.html
        this.initializeView()
        // Set color palette
        var color = d3.scaleOrdinal().domain(data)
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

        let pie = d3.pie()
        .value(d => d.value)

        var pieData = pie(d3.entries(data))

        d3.select('#content').selectAll("None")
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(this.width  * 0.3)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)    
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
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