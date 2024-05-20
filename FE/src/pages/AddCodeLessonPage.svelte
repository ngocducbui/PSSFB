<script lang="ts">
	import { Label, Modal, Select, Textarea } from 'flowbite-svelte';
	import Button from '../atoms/Button.svelte';
	import CodeEditor2 from '../components/CodeEditor2.svelte';
	import { intitCodeQuestion, type codeQuestion, initTestCase } from '$lib/type';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { addCodeQuestion, getModCourseById } from '$lib/services/ModerationServices';
	import { page } from '$app/stores';
	import { checkTitle, showToast } from '../helpers/helpers';
	import { onMount } from 'svelte';
	import { pageStatus } from '../stores/store';
	import { goto } from '$app/navigation';
	import Editor from '@tinymce/tinymce-svelte';
	import {
		CComplieToCheck,
		CPlusComplieCodeToCheck,
		JavaComplieCodeToCheck
	} from '$lib/services/CompilerService';
	import CodeEditor4 from '../components/CodeEditor4.svelte';

	export let course: any;
	export let result = '';
	const ids = $page.params.ids.split('/');

	let codeQuestion: codeQuestion = intitCodeQuestion();
	const chapterId = ids[1];
	const courseId: any = ids[0];

	const saveCQ = async () => {
		if (!checkTitle(codeQuestion.title)) {
			showToast('Save Pratice lesson', 'Enter title shorter than 256 char');
			return;
		}

		pageStatus.set('load');
		console.log(JSON.stringify({ chapterId, practiceQuestion: codeQuestion }));
		try {
			const response = await addCodeQuestion({ chapterId, practiceQuestion: codeQuestion });
			console.log(response);
			showToast('Add Practice Question', 'Add practice Question Success', 'success');
			goto(`/manager/coursesmanager/addcourse/addexam/${courseId}/${chapterId}`);
		} catch (e) {
			console.log(e);
			showToast('Add Practice Question', 'Something went wrong', 'error');
		}
		pageStatus.set('done');
	};

	const executeCode = async () => {
		pageStatus.set('load');
		switch (course.tag) {
			case 'Java':
				result = await JavaComplieCodeToCheck(codeQuestion.codeForm, codeQuestion.testCaseJava);

			case 'C':
				result = await CComplieToCheck(codeQuestion.codeForm, codeQuestion.testCaseC);
			case 'C++':
				result = await CPlusComplieCodeToCheck(codeQuestion.codeForm, codeQuestion.testCaseCplus);
		}

		pageStatus.set('done');
	};
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<Label defaultClass="text-2xl font-medium mb-3 block">Add Pratice Question</Label>
			<a href="/manager/tutorial/createCodelesson " class="text-blue-500 underline"
				>Tutorial how to create a pratice lesson</a
			>
			<hr class="my-5" />
			<div class="mb-3">
				<div class="mb-2">
					<Label>Title</Label>
				</div>
				<Textarea bind:value={codeQuestion.title} />
			</div>
			<Label defaultClass=" mb-1 block">Description</Label>
			<div class="mb-5">
				<Editor
					bind:value={codeQuestion.description}
					apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
				/>
			</div>
			<div class="my-1">
				<Label>CodeForm</Label>
			</div>
			<CodeEditor2 bind:lang={course.tag} bind:value={codeQuestion.codeForm} />
			<div class="mt-4">
				<Label>TestCases</Label>
			</div>
			{#if course?.tag == 'Java'}
				<CodeEditor4
					bind:result
					{executeCode}
					bind:lang={course.tag}
					bind:value={codeQuestion.testCaseJava}
				/>
			{:else if course?.tag == 'C'}
				<CodeEditor4
					bind:result
					{executeCode}
					bind:lang={course.tag}
					bind:value={codeQuestion.testCaseC}
				/>
			{:else if course?.tag == 'C++'}
				<CodeEditor4
					bind:result
					{executeCode}
					bind:lang={course.tag}
					bind:value={codeQuestion.testCaseCplus}
				/>
			{/if}
			<hr class="my-5" />

			<div class="flex justify-end"><Button onclick={saveCQ} content="Save" /></div>
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminCourseSb bind:course />
	</div>
</div>
