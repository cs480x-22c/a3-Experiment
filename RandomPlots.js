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

    createStackedBarChart() {

    }

    createPieChart() {

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