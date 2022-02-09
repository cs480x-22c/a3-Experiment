<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let value = 8;

    let svg, rect, line;
    var data = [75, 66, 81, 15, 18, 85];
    var xCount = 5;



    onMount(() => {
        // Use onMount to ensure it only runs on a loaded page
        svg = d3.select('.vis').append('svg')
            .attr("viewBox", [-15, 10, 120, 120])



        svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr('x', function () {
            xCount += 5
            return xCount;
        })
        .attr('y', function (d){
            return 100-d;
        })
        .attr('width', 4)
        .attr('height', function (d) {return d;})
        .on("mouseover", function(d,i){
            //d3.select(line).enter.append('line')
            svg.selectAll('line')
                .data(data)
                .enter().append('line').attr('x1', 10)
                .attr('y1', function (d){
                    return 100-d;
                })
                .attr('x2', 70)
                .attr('y2', function (d){
                    return 100-d;
                })
                .attr('stroke', 'red')
            //d3.select(this).attr('fill','#0f00ff')
        } )
        .on("mouseout", function (d,i){
            d3.selectAll("line").remove();
            //d3.select(this).attr('fill', '#000000')
        })
    })

</script>

<input type="number" bind:value={value} />
<div class="vis"></div>


<style>
    p {
        color: red;
    }
</style>