<script lang="ts">
	import { Label, Modal, Select, Textarea } from 'flowbite-svelte';
	import Button from '../atoms/Button.svelte';
	import CodeEditor2 from '../components/CodeEditor2.svelte';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { getModCourseById, updateCodeQuestion } from '$lib/services/ModerationServices';
	import { checkTitle, showToast } from '../helpers/helpers';
	import { pageStatus } from '../stores/store';
	import Editor from '@tinymce/tinymce-svelte';
	import {
		CComplieToCheck,
		CPlusComplieCodeToCheck,
		JavaComplieCodeToCheck
	} from '$lib/services/CompilerService';
	import CodeEditor4 from '../components/CodeEditor4.svelte';

	export let data;
	let result = '';
	let course = data.course;
	let codeQuestion = data.codelesson;

	const saveCQ = async () => {
		if (!checkTitle(codeQuestion.title)) {
			showToast('Save Pratice lesson', 'Enter title shorter than 256 char');
			return;
		}

		pageStatus.set('load');
		console.log(
			JSON.stringify({ practiceQuestionId: codeQuestion.id, practiceQuestion: codeQuestion })
		);
		try {
			await updateCodeQuestion({
				practiceQuestionId: codeQuestion.id,
				practiceQuestion: codeQuestion
			});
			showToast('Edit Practice Question', 'Edit practice Question Success', 'success');
			course = await getModCourseById(course.id);
		} catch (e) {
			console.log(e);
			showToast('Edit Practice Question', 'Something went wrong', 'error');
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
	<div class="w-3/5 mx-auto">
		<div>
			<Label defaultClass="text-xl mb-3 block">Edit Pratice Question</Label>
			<a class="text-blue-500 text-sm hover:underline" href="/manager/tutorial/createCodelesson"
				>Tutorial how to create a pratice lesson</a
			>
			<hr class="my-5" />
			<Label>Title</Label>
			<Textarea bind:value={codeQuestion.title} />
			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				<Editor
					bind:value={codeQuestion.description}
					apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
				/>
			</div>
			<Label>CodeForm</Label>
			<CodeEditor2 bind:lang={course.tag} bind:value={codeQuestion.codeForm} />
			<Label>TestCases</Label>
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
			<div class="flex justify-end"><Button onclick={saveCQ} content="Save" /></div>
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminCourseSb bind:course />
	</div>
</div>
