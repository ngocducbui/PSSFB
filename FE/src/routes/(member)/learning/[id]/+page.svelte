<script lang="ts">
	import LoadingPage from '../../../../pages/LoadingPage.svelte';

	import LearningDetailPage from '../../../../pages/LearningDetailPage.svelte';
	import { page } from '$app/stores';
	import { getCourseById } from '$lib/services/CourseServices';
	import { getCommentByCourse } from '$lib/services/CommentService';
	import { currentUser } from '../../../../stores/store';
	//export let data:any;
	const id:any = $page.params.id;
	const p = async ():Promise<any> => {
		const course = await getCourseById(id, $currentUser?.UserID);
		const comments = await getCommentByCourse(id);
		return {
			course,
			comments,
		};
	};
	const promise = p();
</script>

{#await promise}
	<LoadingPage />
{:then promisedata} 
	<LearningDetailPage data={promisedata} /> 
{:catch error}
<div>{error.message}</div>
{/await}
