<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { initAnswer, initExam, initQuestionExam } from '$lib/type';
	import { addExam, getModCourseById } from '$lib/services/ModerationServices';
	import { pageStatus } from '../stores/store';
	import { handlePosetiveInput, showToast } from '../helpers/helpers';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data;
	let course = data.course;
	const ids = $page.params.ids.split('/');
	const chapterId: any = ids[1];
	let Exam = initExam(chapterId);
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

	const AddExam = async () => {
		if (Exam.time < 60) {
			showToast('Save Exam', 'Exam duration muse be greater or equal one minute');
			return;
		}

		if (Exam.percentageCompleted < 1) {
			showToast('Save Exam', 'Exam Percentage Completed muse be greater or equal 1%');
			return;
		}
		pageStatus.set('load');
		try {
			console.log(JSON.stringify({ chapterId, lastExam: Exam }));
			const response = await addExam({ chapterId, lastExam: Exam });
			console.log(response);
			course = await getModCourseById(course.id);
			showToast('Add Exam', 'Add Exam success', 'success');
		} catch (e) {
			console.log(e);
			showToast('Add Exam', 'something went wrong', 'error');
		}
		pageStatus.set('done');
		goto('/manager/creattingcourses');
	};
</script>

<div class="flex">
	<div class="w-3/5 mx-auto">
		<Label defaultClass=" mb-3 block text-2xl font-medium">Add Exam</Label>
		<hr class="my-3" />
		<Label defaultClass=" mb-3 block">Add Exam Name</Label>
		<Input bind:value={Exam.name} classes="border w-2/3" name="name" placehoder="Exam name" />
		<Label defaultClass=" mb-1 mt-3 block">Time (Second)</Label>
		<input
			min="1"
			type="number"
			name="time"
			bind:value={Exam.time}
			class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md"
			required
		/>
		<Label defaultClass=" mb-1 block">Percentage Completed (%)</Label>
		<input
			min="1"
			type="number"
			name="time"
			bind:value={Exam.percentageCompleted}
			class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md"
			required
		/>
		<Label defaultClass=" mb-3 block">Question</Label>

		{#each Exam.questionExams as q, index}
			<div class="bg-gray-100 px-6 py-4">
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
					<div class=" flex items-end">
						<Button
							type="danger"
							onclick={() => {
								DeleteQ(index);
							}}
							content="Delete"
						/>
					</div>
				</div>
				<Label defaultClass=" mb-1 mt-3 block">Question Content</Label>
				<Textarea class="" bind:value={q.contentQuestion} />
			</div>

			<hr class="my-5" />
		{/each}
		<Button onclick={addQues} content="Add Question" />
		<div class="flex justify-end">
			<Button onclick={AddExam} content="Save" />
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
				initAnswer(false)
			])}
		content="Add Answer"
	/>
	<svelte:fragment slot="footer">
		<Button
			onclick={() => {
				if (Exam.questionExams[SelectedQIndex].answerExams?.length < 2) {
					showToast('Save Exam', 'Create more answers', 'warning');
					return;
				}

				const haveCorrectAnswer = Exam.questionExams[SelectedQIndex].answerExams.filter(
					(a) => a.correctAnswer == true
				);
				if (haveCorrectAnswer.length > 0) {
					console.log(Exam);
					defaultModal = false;
				} else {
					showToast('Save Exam', 'Choose a correct answer', 'warning');
				}
			}}
			content="Save"
		/>
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>
