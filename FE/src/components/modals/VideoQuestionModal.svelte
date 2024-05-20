<script lang="ts">

	import { Button, Modal } from "flowbite-svelte";
    export let showModal = false;
	export let onClose = () => {};
    export let question:any
    const correctAnswer = question.answerOptions.filter((answer:any) => answer.correctAnswer == true)

    let answering = true;
</script>
<Modal title="Question" bind:open={showModal} on:close={() => {answering = true, onClose()}}>
	<div>Choose {correctAnswer?.length??0} option(s)</div>
	<div>{question.contentQuestion}</div>
    <div class="{answering?"":"hidden"}">
        {#each question.answerOptions as answer}
            <div class="mb-2"><input type="checkbox"/> {answer.optionsText}</div>
        {/each}
    </div>
    <div class="{answering?"hidden":""}">
        {#each question.answerOptions as answer}
            <div class="mb-2 {answer.correctAnswer?"text-lime-400":"text-red-500"}"> {answer.optionsText}</div>
        {/each}
    </div>
    <div class="{answering?"":"hidden"}" slot="footer">
		<Button on:click={() => answering=false} color="alternative">Answer</Button>
	</div>
</Modal>