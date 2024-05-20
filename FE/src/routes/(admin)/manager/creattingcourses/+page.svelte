<script>
	import { getCreatingCourseByUser } from "$lib/services/ModerationServices";
	import CreatedCoursesPage from "../../../../pages/CreatedCoursesPage.svelte";
	import LoadingPage from "../../../../pages/LoadingPage.svelte";
	import { currentUser } from "../../../../stores/store";
	//export let data;
	const promise = getCreatingCourseByUser($currentUser?.UserID)
</script>

{#await promise}
	<LoadingPage />
{:then courses} 
	<CreatedCoursesPage {courses}/>
{:catch error}
<div>{error}</div>
{/await}
