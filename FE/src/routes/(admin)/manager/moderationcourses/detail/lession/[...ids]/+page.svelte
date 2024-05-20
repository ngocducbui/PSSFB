<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../../../../../../../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../../../atoms/Button.svelte';
	import { initQuestion, type lesson, initlessons, initAnswer } from '$lib/type';
	import { goto } from '$app/navigation';
	import AdminCourseSb from '../../../../../../../components/AdminCourseSB.svelte';
	import { showToast } from '../../../../../../../helpers/helpers';
	import { addlesson, getModCourseById, updatelesson } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { getCourseById } from '$lib/services/CourseServices';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';

	export let data;
	console.log(data);
	let course = data.course;
	let lesson = data.lesson;
	$: questions = lesson.questions ?? [];
	const ids = $page.params.ids.split('/');
	const lessonId = ids[1];
	const courseId: any = ids[0];
	let defaultModal = false;
	let SelectedQIndex = 0;
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<Label defaultClass=" mb-3 block">Detail lesson</Label>
			<hr class="my-3" />
			<Label defaultClass=" mb-3 block">lesson Title</Label>
			<div>{lesson.title}</div>

			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				{@html lesson.description}
			</div>
			<Label defaultClass=" mb-3 block">Duration: {lesson.duration}</Label>
			<Label defaultClass=" mb-3 block">Video</Label>
			<div class="w-3/4">
				<video src={lesson.videoUrl} id="vid" class=" mb-5" width="400" height="300" controls>
					<track kind="captions" />
				</video>
			</div>
			<Label defaultClass=" mb-3 block">lesson Content</Label>
			{@html lesson.contentLesson}

			<hr class="my-5" />

			<Label defaultClass=" mb-3 block">Question</Label>

			{#each questions as q, index}
				<div class="flex justify-between">
					<div class="w-4/5">
						<button
							class="mb-5"
							on:click={() => {
								SelectedQIndex = index;
								defaultModal = true;
							}}>question #{index + 1}</button
						>
						<Label defaultClass=" mb-3 block">Question Content</Label>
						<div>{q.contentQuestion}</div>
						<Label defaultClass=" mb-3 block">Popup Second: {q.time}</Label>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminSystemSb bind:course />
	</div>
</div>

<Modal title="Answers" bind:open={defaultModal}>
	{#each questions[SelectedQIndex].answerOptions as answer, index}
		<div class="flex justify-between">
			<div>
				<Label>Answer: {answer.optionsText}</Label>
			</div>
		</div>
	{/each}

	<svelte:fragment slot="footer">
		<Button onclick={() => (defaultModal = false)} content="Back" />
	</svelte:fragment>
</Modal>
