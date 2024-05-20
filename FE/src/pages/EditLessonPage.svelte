<script lang="ts">
	import { Label, Modal, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../atoms/Button.svelte';
	import { initQuestion, initAnswer, type lesson } from '$lib/type';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { checkExist, checkTitle, handlePosetiveInput, showToast } from '../helpers/helpers';
	import { addlesson, getModCourseById, updatelesson } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { pageStatus } from '../stores/store';
	import Dropzone from 'svelte-file-dropzone';
	import { getVideoURL, uploadVid } from '../firebase';
	import Icon from '@iconify/svelte';

	export let data;
	let course = data.course;
	let lesson: lesson = data.lesson;
	$: questions = lesson.questions ?? [];
	const ids = $page.params.ids.split('/');
	const lessonId = ids[1];
	const courseId: any = ids[0];
	let defaultModal = false;
	let SelectedQIndex = 0;
	const addQues = () => {
		lesson.questions = [...questions, initQuestion()];
	};

	const DeleteQ = (index: number) => {
		const copy = [...lesson.questions];
		lesson.questions = [...copy.slice(0, index), ...copy.slice(index + 1, copy.length + 1)];
	};

	const DeleteA = (index: number) => {
		const copy = [...lesson.questions[SelectedQIndex].answerOptions];
		lesson.questions[SelectedQIndex].answerOptions = [
			...copy.slice(0, index),
			...copy.slice(index + 1, copy.length + 1)
		];
	};

	const Editlesson = async () => {
		if (!checkTitle(lesson.title)) {
			showToast('Save lesson', 'Enter title shorter than 256 char');
			return;
		}

		pageStatus.set('load');
		if (checkExist(video)) {
			await frmSubmit();
		}
		try {
			const response = await updatelesson({ lessonId: lessonId, lesson: lesson });
			console.log(response);
			showToast('Edit lesson', 'Edit lesson success', 'success');
			console.log(JSON.stringify({ lessonId: lessonId, lesson: lesson }));
			course = await getModCourseById(courseId);
			console.log('course', course);
		} catch (e) {
			console.error(e);
			showToast('Edit lesson', 'Something went wrong', 'error');
		}
		pageStatus.set('done');
	};

	let video: any;

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		if (isVideo(acceptedFiles[0]?.path)) {
			video = acceptedFiles[0];
			const url = URL.createObjectURL(video);
			const videoE: any = document.getElementById('vid');
			videoE.classList.remove('hidden');
			videoE.src = url;
		}

		console.log(video);
	}

	function isVideo(path: string) {
		if (path.includes('mkv') || path.includes('mp4')) {
			return true;
		}
		return false;
	}

	async function frmSubmit() {
		await uploadVid(video);
		const url: any = await getVideoURL(video?.path);
		if (!checkExist(url)) {
			showToast('Add lesson', 'something went wrong', 'error');
		} else {
			lesson.videoUrl = url;
		}
	}
</script>

<div class="flex">
	<div class="w-3/5 mx-auto">
		<div>
			<Label defaultClass=" mb-1 block text-2xl font-medium">Edit lesson</Label>
			<hr class="my-3" />
			<Label defaultClass=" mb-1 block">lesson Title</Label>
			<Input
				bind:value={lesson.title}
				required={true}
				name="title"
				classes="block w-1/3  border mb-5"
				placehoder="lesson Title"
			/>

			<Label defaultClass=" mb-1 block">Description</Label>
			<div class="mb-5">
				<Textarea bind:value={lesson.description} name="description" placeholder="Description" />
			</div>
			<Label defaultClass=" mb-1 block">Duration</Label>
			<input
				min="1"
				on:blur={handlePosetiveInput}
				type="number"
				class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md"
				required
				name="duration"
				placeholder="duration"
				bind:value={lesson.duration}
			/>
			<Label defaultClass=" mb-1 block">Video</Label>
			<!-- <Input
				required={true}
				name="videoUrl"
				classes="block w-1/3  border mb-5"
				placehoder="Video URL"
				bind:value={lesson.videoUrl}
			/> -->
			<Dropzone containerClasses=" mb-5" on:drop={handleFilesSelect} />
			<video id="vid" class="mb-5" width="400" height="300" controls>
				<track kind="captions" />
				<source src={lesson.videoUrl} type="video/mp4" />
			</video>
			<Label defaultClass=" mb-3 block">lesson Content</Label>
			<Editor
				bind:value={lesson.contentLesson}
				apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
			/>

			<hr class="my-5" />

			<Label defaultClass="mb-3 block text-2xl font-medium">Question</Label>

			{#each questions as q, index}
				<div class="bg-gray-100 px-8 py-6">
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
						<div class="flex items-end">
							<Button
								type="danger"
								onclick={() => {
									DeleteQ(index);
								}}
								content="Delete"
							/>
						</div>
					</div>
					<Label defaultClass=" mb-1 block">Question Content</Label>
					<Textarea class="" bind:value={q.contentQuestion} />
					<Label defaultClass="mt-3 mb-1 block">Popup Second</Label>
					<input
						on:blur={handlePosetiveInput}
						min="1"
						type="number"
						class="block w-1/3 border mb-5 py-3 px-5 font-light text-black rounded-md"
						required
						name="duration"
						placeholder="duration"
						bind:value={q.time}
					/>
				</div>

				<hr class="my-5" />
			{/each}

			<Button onclick={addQues} content="Add Question" />
			<div class="flex justify-end">
				<Button onclick={Editlesson} content="Save" />
			</div>
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminCourseSb bind:course />
	</div>
</div>

<Modal title="Answers" bind:open={defaultModal}>
	{#each questions[SelectedQIndex].answerOptions as answer, index}
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
			(lesson.questions[SelectedQIndex].answerOptions = [
				...lesson.questions[SelectedQIndex].answerOptions,
				initAnswer(false)
			])}
		content="Add Answer"
	/>
	<svelte:fragment slot="footer">
		<Button
			onclick={() => {
				if (lesson.questions[SelectedQIndex].answerOptions?.length < 2) {
					showToast('Save Question', 'Create more answers', 'warning');
					return;
				}

				const haveCorrectAnswer = lesson.questions[SelectedQIndex].answerOptions.filter(
					(a) => a.correctAnswer == true
				);
				if (haveCorrectAnswer.length > 0) {
					console.log(lesson);
					defaultModal = false;
				} else {
					showToast('Save Question', 'Choose a correct answer', 'warning');
				}
			}}
			content="Save"
		/>
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>
