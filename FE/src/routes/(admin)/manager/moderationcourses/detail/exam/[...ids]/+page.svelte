<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { initAnswer, initAnswerExam, initExam, initQuestionExam, initQuestionExam2 } from '$lib/type';
	import { getModCourseById, updateExam } from '$lib/services/ModerationServices';
	import { convertSecondsToMmSs } from '../../../../../../../helpers/helpers';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import ExamAnswers from '../../../../../../../atoms/ExamAnswers.svelte';

    export let data:any;
	$: course = data.course
	let exam = data.exam
	let SelectedQIndex = 0
	let defaultModal = false
	$: selectedQ = exam.questionExams[SelectedQIndex]

	const questionExams = exam.questionExams;

	
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<div class="p-20 border rounded-xl bg-white">
				<div class="text-3xl font-bold">{exam.name}</div>
				<hr class="my-5" />
				
				{#each questionExams as qe, index}
					<div class="border mb-3 rounded py-10 px-5">
						<div class="text-xl font-extrabold mb-5">Question {index + 1}</div>
						<div class="mb-3">{qe.contentQuestion}</div>
						<ExamAnswers submitData={{}}  questionExam={qe} />
					</div>
				{/each}
				
			</div>
		</div>
			
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminSystemSb bind:course={course} />
	</div>
</div>

<Modal title="Answers" bind:open={defaultModal}>
	{#each selectedQ.answerExams as answer, index}
		<div class="flex justify-between">
			<div>
				<Label>{answer.optionsText} - {answer.correctAnswer}</Label>
			</div>
		</div>
	{/each}
	
	<svelte:fragment slot="footer">
		
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>