<script>
	import EditCoursePage from '../../../../../../pages/EditCoursePage.svelte';
	import LoadingPage from '../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then course}
	<div class="w-full h-full">
		<EditCoursePage {course} />
	</div>
{/await}
