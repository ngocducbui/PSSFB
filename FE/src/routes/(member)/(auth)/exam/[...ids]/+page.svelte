<script lang="ts">
	import { page } from '$app/stores';
	import { getChapterById, getCourseById, getExam } from '$lib/services/CourseServices';
	import ExamPage from '../../../../../pages/ExamPage.svelte';
	import LoadingPage from '../../../../../pages/LoadingPage.svelte';
	import { currentUser } from '../../../../../stores/store';
	//export let data;

	const ids = $page.params.ids.split('/');
	const courseId: any = ids[0];
	const chapterId: any = ids[1];
	const examId: any = ids[2];
	const p = async () => {
		const course = await getCourseById(courseId, $currentUser.UserID);
		const chapter = await getChapterById(chapterId);
		const exam = await getExam(examId, $currentUser.UserID);
		return {
			course,
			chapter,
			exam
		};
	};
	const promise = p();
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<ExamPage {data} />
{:catch error}
	<div>{error}</div>
{/await}
