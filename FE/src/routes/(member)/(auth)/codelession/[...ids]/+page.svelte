<script lang="ts">
	import { page } from '$app/stores';
	import {
		CComplier,
		CForm,
		CPlusComplier,
		CPlusForm,
		ExecuteResult,
		JavaComplier,
		JavaForm
	} from '$lib/services/CompilerService';
	import { onMount } from 'svelte';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import CodeEditor from '../../../../../components/CodeEditor.svelte';
	import CourseSideBar from '../../../../../components/CourseSideBar.svelte';
	import { currentUser, pageStatus } from '../../../../../stores/store';
	import { getCourseById } from '$lib/services/CourseServices';
	export let data;
	const ids = $page.params.ids.split('/');
	const courseId: any = ids[0];
	let course: any = [];

	onMount(() => {
		getCourseById(courseId, $currentUser?.UserID).then((rs: any) => (course = rs));
	});
	const chapter = data?.chapter;
	const lesson = data?.practiceQuestion;
	let result: any = '';

	const executeCode = async () => {
		pageStatus.set('load');
		switch (course?.tag) {
			case 'Java':
				const jf: string = JavaForm(lesson.codeForm, lesson.testCaseJava);

				result = await JavaComplier({
					practiceQuestionId: lesson.id,
					userCode: jf,
					userId: $currentUser.UserID
				});

				break;
			case 'C':
				const cf: string = CForm(lesson.codeForm, lesson.testCaseC);
				console.log(lesson);
				console.log({ practiceQuestionId: lesson.id, userCode: cf, userId: $currentUser.UserID });
				result = await CComplier({
					practiceQuestionId: lesson.id,
					userCode: cf,
					userId: $currentUser.UserID
				});
				break;
			case 'C++':
				const cpf: string = CPlusForm(lesson.codeForm, lesson.testCaseCplus);
				console.log({ practiceQuestionId: lesson.id, userCode: cpf, userId: $currentUser.UserID });
				result = await CPlusComplier({
					practiceQuestionId: lesson.id,
					userCode: cpf,
					userId: $currentUser.UserID
				});
				break;
		}

		pageStatus.set('done');
	};
</script>

<div class="min-h-[calc(100vh-64px)] md:min-h[calc(100vh-96px)] bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium flex">
		{course.name} > {chapter.name} >
		<div class="truncate max-w-60">{lesson.title ?? ''}</div>
	</div>
	<div class="flex bg-white text-black">
		<div class="w-1/5"><CourseSideBar bind:course /></div>
		<div class="w-2/5 p-3 overflow-y-scroll max-h-screen">
			<div class="flex items-center"><Avatar classes="w-10 mr-3" /> {course.created_Name}</div>
			<hr class="my-5" />
			<p>
				{@html lesson.description}
			</p>
		</div>
		<div class="w-2/5">
			<CodeEditor bind:result {executeCode} bind:value={lesson.codeForm} lang={course.tag} />
		</div>
	</div>
</div>
