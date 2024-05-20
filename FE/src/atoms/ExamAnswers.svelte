<script lang="ts">
	export let submitData: any;
	export let questionExam: any;
	$: answerExams = questionExam.answerExams;
	$: trueAnswer = answerExams.filter((ae: any) => ae.correctAnswer == true);

	function handleCheckboxChange(event: any, aid: number) {
		const isChecked = event.target.checked;
		if (isChecked) {
			const q = submitData.questionExam.find((qe: any) => qe.id == questionExam.id);
			q.selectedAnswerIds = [aid];
		} else {
			const q = submitData.questionExam.find((qe: any) => qe.id == questionExam.id);
			q.selectedAnswerIds = q.selectedAnswerIds.filter((id: number) => id != aid);
		}
	}

	function handleCheckboxChange2(event: any, aid: number) {
		const isChecked = event.target.checked;
		if (isChecked) {
			const q = submitData.questionExam.find((qe: any) => qe.id == questionExam.id);
			q.selectedAnswerIds = [...q.selectedAnswerIds, aid];
		} else {
			const q = submitData.questionExam.find((qe: any) => qe.id == questionExam.id);
			q.selectedAnswerIds = q.selectedAnswerIds.filter((id: number) => id != aid);
		}
	}
</script>

{#if trueAnswer.length > 1}
	{#each answerExams as ae}
		<div class="mb-3 flex items-center">
			<input
				on:change={(event) => handleCheckboxChange2(event, ae.id)}
				class="mr-2"
				type="checkbox"
				name="answerQ{questionExam.id}"
			/>{ae.optionsText}
		</div>
	{/each}
	<div class="text-sm text-neutral-700 mt-3">Choose {trueAnswer.length} correct answer</div>
{:else}
	{#each answerExams as ae}
		<div class="mb-3 flex items-center">
			<input
				on:change={(event) => handleCheckboxChange(event, ae.id)}
				class="mr-2"
				type="radio"
				name="answerQ{questionExam.id}"
			/>{ae.optionsText}
		</div>
	{/each}
	<div class="text-sm text-neutral-700 mt-3">Choose one correct answer</div>
{/if}
