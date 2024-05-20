<script>
	import { getAllCourses } from "$lib/services/CourseServices";
	import AllCoursesPage from "../../../pages/AllCoursesPage.svelte";
	import LoadingPage from "../../../pages/LoadingPage.svelte"
	import { currentUser } from "../../../stores/store";
	const promise = getAllCourses("All", '',1,4, $currentUser?.UserID)
</script>

{#await promise}
	<LoadingPage />
{:then result} 
	<AllCoursesPage {result}/>
{:catch error}
<div>{error}</div>
{/await}