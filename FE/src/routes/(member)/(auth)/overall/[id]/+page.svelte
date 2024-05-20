<script lang="ts">
	import { page } from "$app/stores";
	import { getCourseById } from "$lib/services/CourseServices";
	import LoadingPage from "../../../../../pages/LoadingPage.svelte";
	import OverallPage from "../../../../../pages/OverallPage.svelte";
	import { currentUser } from "../../../../../stores/store";
//export let data
const id:any = $page.params.id;
const promise = getCourseById(id, $currentUser?.UserID);
</script>
{#await promise}
	<LoadingPage />
{:then course} 
<OverallPage course={course} />
{:catch error}
<div>{error}</div>
{/await}
