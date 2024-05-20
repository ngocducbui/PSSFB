<script>
	import LoadingPage from '../../../../pages/LoadingPage.svelte';
	import ModerationCoursesPage from '../../../../pages/ModerationCoursesPage.svelte';
	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then result}
	<ModerationCoursesPage {result} />
{:catch error}
	<div>{error}</div>
{/await}
