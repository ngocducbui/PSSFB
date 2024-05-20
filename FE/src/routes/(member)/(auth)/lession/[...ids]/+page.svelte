<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import CommentContainer from '../../../../../components/CommentContainer.svelte';
	import CourseSideBar from '../../../../../components/CourseSideBar.svelte';
	import lessonVideoContainer from '../../../../../components/lessonVideoContainer.svelte';
	import { convertSecondsToMmSs } from '../../../../../helpers/helpers';
	import { currentUser, pageStatus } from '../../../../../stores/store';
	import { delNotes, getCourseById, getNotes, putNote } from '$lib/services/CourseServices';
	import Editor from '@tinymce/tinymce-svelte';
	import Button from '../../../../../atoms/Button.svelte';
	import { delComment, delReplyComment, getCommentBylesson } from '$lib/services/CommentService';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';
	import CodeEditor2 from '../../../../../components/CodeEditor2.svelte';
	import CodeEditor from '../../../../../components/CodeEditor.svelte';
	import CodeEditor3 from '../../../../../components/CodeEditor3.svelte';
	export let data;

	const ids = $page.params.ids.split('/');
	const courseId: any = ids[0];
	let course: any = [];

	const chapter = data?.chapter;
	const lesson = data?.lesson;
	let comments = data?.comments ?? [];
	let notes: any;
	let currentTime = 0;
	let section = 'Comments';
	let RSB = 1;
	let LSB = 1;

	onMount(async () => {
		getCourseById(courseId, $currentUser?.UserID).then((rs: any) => (course = rs));
		notes = await getNotes($currentUser.UserID, lesson.id);
	});

	async function DelNote(id: number) {
		pageStatus.set('load');
		await delNotes(id);
		notes = await getNotes($currentUser.UserID, lesson.id);
		pageStatus.set('done');
	}

	const EditClick = (id: number) => {
		console.log('edit click');
		const noteEditor = document.getElementById(`editornote${id}`);
		const noteContent = document.getElementById(`notecontent${id}`);
		if (noteEditor?.classList.contains('hidden') && !noteContent?.classList.contains('hidden')) {
			noteEditor.classList.remove('hidden');
			noteContent?.classList.add('hidden');
		} else if (
			!noteEditor?.classList.contains('hidden') &&
			noteContent?.classList.contains('hidden')
		) {
			noteEditor?.classList.add('hidden');
			noteContent.classList.remove('hidden');
		}
	};

	async function EditNote(note: any) {
		pageStatus.set('load');
		await putNote(note.id, note);
		notes = await getNotes($currentUser.UserID, lesson.id);
		const noteEditor = document.getElementById(`editornote${note.id}`);
		const noteContent = document.getElementById(`notecontent${note.id}`);
		noteEditor?.classList.add('hidden');
		noteContent?.classList.remove('hidden');
		pageStatus.set('done');
	}
</script>

<div class="bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium">{course.name} > {chapter.name} > {lesson.title}</div>
	<div class="flex bg-white text-black">
		<div class={RSB == 2 ? `hidden` : `w-1/5`}>
			<CourseSideBar bind:course />
		</div>
		<div class="w-{RSB == 0 ? '4' : '3'}/5 p-3 overflow-y-scroll max-h-screen">
			<div class="flex items-center">
				<Avatar src={course.avatar} classes="w-10 mr-3 rounded-full" />
				{course.created_Name}
			</div>
			<hr class="my-5" />
			<div class="flex justify-end">
				<div>
					{#if RSB == 0}
						<button
							on:click={() => {
								switch (section) {
									case 'Comments':
										RSB = 1;
										break;
									case 'Notes':
										RSB = 1;
										break;
									case 'CodeEditor':
										RSB = 2;
										break;
								}
							}}><Icon class="text-4xl" icon="ic:round-menu-open" style="color: #a3a3a3" /></button
						>
					{/if}
				</div>
			</div>
			<lessonVideoContainer {lesson} bind:notes bind:currentTime />
		</div>
		<div class={RSB == 0 ? `hidden` : `w-${RSB}/5`}>
			<button
				on:click={() => {
					if (RSB != 0) {
						RSB = 0;
					}
				}}><Icon class="text-4xl" icon="mdi:menu-close" style="color: #a3a3a3" /></button
			>
			<div class="flex p-5">
				<button
					on:click={() => {
						section = 'Comments';
						RSB = 1;
					}}
					class="mr-3 {section == 'Comments' ? 'text-blue-500 underline underline-offset-8' : ''}"
					>Comments</button
				>
				<button
					on:click={() => {
						{
							section = 'Notes';
							RSB = 1;
						}
					}}
					class="mr-3 {section == 'Notes' ? 'text-blue-500 underline underline-offset-8' : ''}"
					>Notes</button
				>
				<button
					on:click={() => {
						section = 'CodeEditor';
						RSB = 2;
					}}
					class="mr-3 {section == 'CodeEditor' ? 'text-blue-500 underline underline-offset-8' : ''}"
					>CodeEditor</button
				>
			</div>
			<div class="pl-5">
				{#if section == 'Comments'}
					<CommentContainer
						type="lesson"
						lessonId={lesson.id}
						bind:comments
						getComment={() => getCommentBylesson(lesson.id)}
					/>
				{:else if section == 'Notes'}
					<div class="w-full">
						{#each notes as note}
							<div class="flex items-center justify-between mb-3">
								<button
									on:click={() => {
										currentTime = note.videoLink;
									}}
									><span class="py-2 px-5 mr-3 bg-blue-500 rounded-full text-white"
										>{convertSecondsToMmSs(note.videoLink)}</span
									></button
								>
								<div class="flex items-center">
									<button on:click={() => EditClick(note.id)}>
										<Icon
											class="text-2xl mr-3"
											icon="material-symbols:edit"
											style="color: #aeadad"
										/>
									</button>

									<button on:click={() => DelNote(note.id)}
										><Icon
											class="text-2xl mr-3"
											icon="material-symbols:delete"
											style="color: #aeadad"
										/></button
									>
								</div>
							</div>
							<div class="bg-neutral-100 px-5 py-3 text-wrap mb-5">
								<div id="notecontent{note.id}">{@html note.contentNote}</div>
								<div id="editornote{note.id}" class="hidden">
									<Editor
										bind:value={note.contentNote}
										apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
									/>
									<div class="flex justify-end">
										<Button onclick={() => EditNote(note)} content="Edit Note" />
									</div>
								</div>
							</div>
						{/each}
					</div>
				{:else if section == 'CodeEditor'}
					<CodeEditor3 lessonId={lesson.id} />
				{/if}
			</div>
		</div>
	</div>
</div>
