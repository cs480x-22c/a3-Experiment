<script>
    import Graph from './Graph.svelte';
	export let question;
	export let hoverable;
    export let response = 0;
    let pctResponse = 0;
    let max;
    $: max = question.data[question.comp2]
    $: pctResponse = response/max
</script>

<div class="question">
	<span class="Graph">
		<Graph {...question} {hoverable} />
    </span>
	<span class="Prompt">
		<p id="prompt">
			Compare the heights of the red and blue bars. 
            <br/><br/>
            In the field below, enter your guess for the blue bar's height,
            given that the red bar is valued at {question.data[question.comp2]}. 
            <br/><br/>
            {hoverable ? "You can hover over a bar to see a line spanning the graph." : ""}
		</p>
	</span>
	<span class="Answer">
        <h4>Your guess</h4>
		<input type="number" bind:value={response} min=0 max={max}  />
        <input type="range" bind:value={response} min=0 max={max} />
        <span>{Math.round(pctResponse*100)/1}% of the red bar</span>
    </span>
</div>

<style>
	.question {
		margin: 0;
        width: 100%;
		display: grid;
        gap: 1em 1em;
        height: 100%;
	}

    @media (max-width: 600px) {
        .question{        
            grid-template-columns: 1fr;
            grid-template-rows: 35vh 25vh 20vh;
            grid-auto-flow: column;
            grid-template-areas:
            'Graph'
            'Prompt'
            'Answer';
        }
        .Graph {
            height: 40vh;
        }
    }
    
    @media (min-width: 600px) {
        .question{
            height: 85vh;
            grid-template-columns: 50vh 1fr;
            grid-template-rows: 40vh 1fr;
            grid-auto-flow: column;
            grid-template-areas:
			'Graph Prompt Prompt'
			'Graph Answer Answer';
        }
        .Graph {
            height: 80vh;
        }
    }

	.Graph {
		grid-area: Graph;
	}

	.Prompt {
		grid-area: Prompt;
	}

	.Answer {
		grid-area: Answer;
	}
</style>
