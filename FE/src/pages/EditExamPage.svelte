<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import {
		initAnswer,
		initAnswerExam,
		initExam,
		initQuestionExam,
		initQuestionExam2
	} from '$lib/type';
	import { pageStatus } from '../stores/store';
	import { getModCourseById, updateExam } from '$lib/services/ModerationServices';
	import { handlePosetiveInput, showToast } from '../helpers/helpers';
	import Icon from '@iconify/svelte';

	export let data: any;
	$: course = data.course;
	let Exam = data.exam;
	let SelectedQIndex = 0;
	let defaultModal = false;
	$: selectedQ = Exam.questionExams[SelectedQIndex];

	const addQues = () => {
		Exam.questionExams = [...Exam.questionExams, initQuestionExam()];
	};

	const DeleteQ = (index: number) => {
		const copy = [...Exam.questionExams];
		Exam.questionExams = [...copy.slice(0, index), ...copy.slice(index + 1, copy.length + 1)];
	};

	const DeleteA = (index: number) => {
		const copy = [...Exam.questionExams[SelectedQIndex].answerExams];
		Exam.questionExams[SelectedQIndex].answerExams = [
			...copy.slice(0, index),
			...copy.slice(index + 1, copy.length + 1)
		];
	};

	const UpdateExam = async () => {
		pageStatus.set('load');
		try {
			console.log(JSON.stringify({ lastExamId: Exam.id, lastExam: Exam }));
			const response = await updateExam({ lastExamId: Exam.id, lastExam: Exam });
			console.log(response);
			course = await getModCourseById(course.id);
			showToast('Update Exam', 'Update Exam success', 'success');
		} catch (e) {
			console.log(e);
			showToast('Update Exam', 'Sonething went wrong', 'error');
		}
		pageStatus.set('done');
	};

	const SaveQuestion = () => {
		if(Exam.questionExams[SelectedQIndex].answerExams?.length < 2){
			showToast('Save Exam', 'Create more answers', 'warning');
			return;
		}

		const haveCorrectAnswer = Exam.questionExams[SelectedQIndex].answerExams.filter(
			(a: any) => a.correctAnswer == true
		);
		if (haveCorrectAnswer.length > 0) {
			console.log(Exam);
			defaultModal = false;
		} else {
			showToast('Save Exam', 'Choose a correct answer', 'warning');
		}
	};
</script>

<div class="flex">
	<div class="w-4/5">
		<Label defaultClass=" mb-3 block">Edit Exam</Label>
		<hr class="my-3" />
		<Label defaultClass=" mb-3 block">Exam Name</Label>
		<Input bind:value={Exam.name} classes="ml-4 border w-2/3" name="name" placehoder="Exam name" />
		<Label defaultClass=" mb-3 block">Time (Second)</Label>
		<input
			min="1"
			on:blur={handlePosetiveInput}
			type="number"
			name="time"
			bind:value={Exam.time}
			class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
			required
		/>
		<Label defaultClass=" mb-3 block">Percentage Complted (%)</Label>
		<input
			min="1"
			on:blur={handlePosetiveInput}
			type="number"
			name="time"
			bind:value={Exam.percentageCompleted}
			class="block w-1/3 ml-4 border mb-5 py-3 px-5 font-light text-black rounded-md"
			required
		/>
		<Label defaultClass=" mb-3 block">Question</Label>

		{#each Exam.questionExams as q, index}
			<div>
				<div class="flex justify-between">
					<button
						class="mb-5 flex text-blue-500 items-center"
						on:click={() => {
							SelectedQIndex = index;
							defaultModal = true;
						}}
						>Question #{index + 1}
						<Icon class="ml-1" icon="material-symbols:edit" style="color: #5c61ff" /></button
					>
					<div class="w-1/5 flex items-end">
						<Button
							type="danger"
							onclick={() => {
								DeleteQ(index);
							}}
							content="Delete"
						/>
					</div>
				</div>
				<Label defaultClass=" mb-3 block">Question Content</Label>
				<Textarea class="w-4/5 ml-5" bind:value={q.contentQuestion} />
			</div>

			<hr class="my-5" />
		{/each}
		<Button onclick={addQues} content="Add Question" />
		<div class="flex justify-end">
			<Button onclick={UpdateExam} content="Save" />
		</div>
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminCourseSb bind:course />
	</div>
</div>

<Modal title="Answers" bind:open={defaultModal}>
	{#each selectedQ.answerExams as answer, index}
		<div class="flex justify-between">
			<div>
				<Label>Answer</Label>
				<Input classes="border w-2/3" bind:value={answer.optionsText} />
				<input type="checkbox" bind:checked={answer.correctAnswer} />
			</div>
			<div><Button type="danger" onclick={() => DeleteA(index)} content="" /></div>
		</div>
	{/each}
	<Button
		onclick={() =>
			(Exam.questionExams[SelectedQIndex].answerExams = [
				...Exam.questionExams[SelectedQIndex].answerExams,
				initAnswerExam(false, Exam.id)
			])}
		content="Add Answer"
	/>
	<svelte:fragment slot="footer">
		<Button
			onclick={SaveQuestion}
			content="Save"
		/>
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>
