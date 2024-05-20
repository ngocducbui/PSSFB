<script lang="ts">
	import Icon from '@iconify/svelte';
	import { checkExist, checkNote, convertSecondsToMmSs, showToast } from '../helpers/helpers';
	import VideoQuestionModal from './modals/VideoQuestionModal.svelte';
	import { Modal } from 'flowbite-svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../atoms/Button.svelte';
	import { addNote, completelesson, getNotes } from '$lib/services/CourseServices';
	import { currentUser, pageStatus } from '../stores/store';

	export let lesson: any;
	export let notes: any;
	export let currentTime = 0;
	let questions = lesson.theoryQuestions;
	let question = questions[0];
	let showModal = false;
	//let firstTimePlay = true;
	let interval: any;
	let showNoteModal = false;

	$: {
		const video: any = document.getElementById('video');
		if (video?.duration == currentTime) {
			completelesson($currentUser?.UserID, lesson?.id);
		}
	}

	const openQuestion = () => {
		const video: any = document.getElementById('video');
		const Q = questions.find((q: any) => q.time == Math.round(currentTime));
		if (checkExist(Q)) {
			question = Q;
			showModal = true;
			video.pause();
		}
	};

	const FirstPlay = () => {
		interval = setInterval(openQuestion, 1000);
	};

	let note = '';
	const AddNote = async () => {
		console.log('Add note');
		const video: any = document.getElementById('video');
		video.pause();
		console.log('Add note', note);
		if (!checkExist(note.trim()) || !checkNote(note)) {
			showToast('Add note', 'Invalid note content', 'warning');
			return;
		}
		pageStatus.set('load');

		const response = await addNote({
			lessonId: lesson.id,
			userId: $currentUser.UserID,
			contentNote: note,
			videoLink: Math.floor(currentTime)
		});
		console.log('response', response);
		showModal = false;
		notes = await getNotes($currentUser.UserID, lesson.id);
		pageStatus.set('done');
	};

	const onClose = () => {
		const video: any = document.getElementById('video');
		video.play();
	};
</script>

<div class="text-xl font-medium mb-10">{lesson.description}</div>

<video
	bind:currentTime
	class="ml-10 w-11/12"
	on:play={FirstPlay}
	on:pause={() => clearInterval(interval)}
	id="video"
	controls
>
	<source src={lesson.videoUrl} type="video/mp4" />
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
	Your browser does not support the video tag.
</video>

<div class="flex justify-end pr-16 mt-3">
	<button
		class="py-2 px-5 font-light bg-neutral-200 rounded-xl flex items-center"
		on:click={() => (showNoteModal = true)}
		><Icon class="mr-2 text-xl" icon="ic:baseline-plus" style="color: black" /> Add note at
		<span class="font-normal ml-2">{convertSecondsToMmSs(currentTime)}</span></button
	>
</div>

<div class="mt-20">{@html lesson.contentLesson}</div>

<VideoQuestionModal {onClose} bind:question bind:showModal />
<Modal title="Add Note" bind:open={showNoteModal} on:close={() => (showNoteModal = false)}>
	<Editor bind:value={note} apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83" />
	<svelte:fragment slot="footer">
		<Button onclick={AddNote} content={'Add Note'} />
		<Button onclick={() => (showModal = false)} content={'Close'} />
	</svelte:fragment>
</Modal>
