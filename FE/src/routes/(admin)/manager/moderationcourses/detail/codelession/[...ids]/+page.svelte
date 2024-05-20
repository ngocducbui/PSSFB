<script lang="ts">
	import { Label, Modal, Select, Textarea } from 'flowbite-svelte';
	import { getModCourseById, updateCodeQuestion } from '$lib/services/ModerationServices';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';
	import CodeEditor2 from '../../../../../../../components/CodeEditor2.svelte';

	export let data;

	let course = data.course;
	let codeQuestion = data.codelesson;
</script>

<div class="flex">
	<div class="w-4/5">
		<div>
			<Label defaultClass=" mb-3 block">Detail Pratice Question</Label>
			<hr class="my-5" />
			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5 ml-4">
				{@html codeQuestion.description}
			</div>
			<Label>CodeForm</Label>
			<CodeEditor2 readonly={true} bind:lang={course.tag} bind:value={codeQuestion.codeForm} />
			<Label>TestCases</Label>
			{#if course?.tag == 'Java'}
				<CodeEditor2
					readonly={true}
					bind:lang={course.tag}
					bind:value={codeQuestion.testCaseJava}
				/>
			{:else if course?.tag == 'C'}
				<CodeEditor2 readonly={true} bind:lang={course.tag} bind:value={codeQuestion.testCaseC} />
			{:else if course?.tag == 'C++'}
				<CodeEditor2
					readonly={true}
					bind:lang={course.tag}
					bind:value={codeQuestion.testCaseCplus}
				/>
			{/if}
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminSystemSb bind:course />
	</div>
</div>
