<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	let svg;
	export let data;
	export let comp1;
	export let comp2;
	export let hoverable = true;
	let vis;

	onMount(() => {
		svg = d3.select('.vis').append('svg');
		svg.attr('viewBox', [-5, 0, 64, 120]).style('height', 'inherit');
		draw();
	});

	let draw = () => {
		if (svg) {
			svg.selectAll('*').remove();
			let groups = svg
				.selectAll('group')
				.data(data)
				.enter()
				.append('g')
				.on('mouseover', function (d, i) {
					if (hoverable) d3.select(this).selectAll('#guide').style('visibility', 'visible');
				})
				.on('mouseout', function (d, i) {
					if (hoverable) d3.select(this).selectAll('#guide').style('visibility', 'hidden');
				});

			let bars = groups
				.append('rect')
				.attr('x', (d, i) => {
					return i * 10;
				})
				.attr('y', function (d) {
					return 100 - d;
				})
				.attr('width', 8)
				.attr('height', function (d) {
					return d;
				})
				.attr('fill', (d, i) => {
					if (comp1 == i) return '#0000FF';
					else if (comp2 == i) return '#FF0000';
					else return '#FFFFFF';
				})
				.attr('stroke', 'black');

			let lines = groups
				.append('line')
				.attr('id', 'guide')
				.attr('x1', 0)
				.attr('x2', 10 * data.length - 1)
				.attr('y1', (d) => 100 - d)
				.attr('y2', (d) => 100 - d)
				.attr('stroke', 'red')
				.style('visibility', 'hidden');
		}
		``;
	};

	$: {
		data; //trigger every time data changes
		draw();
	}
</script>

<div class="vis" bind:this={vis} />

<style>
	.vis {
		padding: 1em 1em 1em 1em;
		height: inherit;
	}
</style>
