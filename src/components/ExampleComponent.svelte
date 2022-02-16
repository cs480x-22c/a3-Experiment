<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    let value = 8;

    let svg, circle;

    onMount(() => {
        // Use onMount to ensure it only runs on a loaded page
        svg = d3.select('.vis').append('svg')
        .attr("viewBox", [0, 0, 50, 50])
        circle = svg.append("circle").attr("cx", 25)
        .attr("cy", 25)
        .attr("fill", "#10907f")
    })
    
    $: if(circle) {
        // Check if circle is undefined (this is the case before the comment mounts)
        circle
        .attr("r", value)
    }
        
</script>

<input type="number" bind:value={value} />
<div class="vis"></div>

<p>
    The value is {value}
</p>


<style>
    p {
        color: red;
    }
</style>