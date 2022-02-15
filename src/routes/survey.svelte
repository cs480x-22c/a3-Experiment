<script>
	import { Button, Pagination } from 'attractions';
	import { onMount } from 'svelte';
	import Question from '../components/Question.svelte';
	let questions;
	let currentPage;
	let numQuestions = 1;
	onMount(async () => {
		questions = (await (await fetch('/questions.json')).json())
		numQuestions = questions.length;
	});

	let responses = {};
	let currentResponse;
	$: responses[currentPage] = currentResponse;

	let submitForm = async () => {
		//get this using prefill link
		const formID = '1FAIpQLSdiON02QMfiQt4U29xJgY_Kk2rL5XONc5D9sz3qyps0CSbmfA';

		let fields = {
			'1': 'entry.1250327149',
			'2': 'entry.1550003358',
			'3': 'entry.796467503',
			'4': 'entry.414099223',
			'5': 'entry.1191868527',
			'6': 'entry.707594900',
			'7': 'entry.1899165164',
			'8': 'entry.1742913110',
		};

		let url = `https://docs.google.com/forms/d/e/${formID}/formResponse?usp=pp_url`;

		Object.keys(fields).forEach((key, index) => {
			let response = responses[key];
			url += `&${fields[key]}=${response ? response : 'empty'}`;
		});

		url += '&submit=Submit';

		const res = await fetch(url, {
			mode: 'no-cors'
		});
		
		window.location.href = "./thanks";

		return res;
	};
</script>

<div id="questions">
	{#if questions}
		<Question bind:response={currentResponse} question={questions[currentPage-1]} hoverable={(currentPage % 2) == 0} />
	{/if}
</div>
<span  id="pages">
    <Pagination  pages={numQuestions} bind:currentPage />
</span>
<span  id="submit">
    <Button filled on:click={submitForm}>Submit</Button>
</span>


<style>
	#questions {
		width: 100%;
		height: 80vh;
        overflow-y: scroll;
        margin: none;
	}
	#pages {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 80%;
	}
	#submit {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 20%;
        padding: 2em;
	}
</style>
