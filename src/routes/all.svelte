<script>
	import Graph from '../components/Graph.svelte';
	import Form from '../components/Form.svelte';
	import { onMount } from 'svelte';
	let questions;
	onMount(async () => {
		questions = await (await fetch('/questions.json')).json();
	});
</script>


{#if questions}
    {#each questions as question}
        <div id="graph">
            <Graph {...question} hoverable={true}/>
        </div>
    {/each}
{/if}

<style>
    #graph {
        width: 40vw;
        height: 50vh;
    }
</style>
