<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let value = 8;

    onMount(() => {
        // Use onMount to ensure it only runs on a loaded page
        let svg = d3.select('.vis').append('svg')
        .attr("viewBox", [0, 0, 50, 50])
    
        svg.append("circle")
            .attr("cx", 25)
            .attr("cy", 25)
            .attr("r", value)
            .attr("fill", "#10907f")
    })
        
</script>

<div class="vis"></div>

<p>
    The value is {value}
</p>

<style>
    p {
        color: red;
    }
</style>