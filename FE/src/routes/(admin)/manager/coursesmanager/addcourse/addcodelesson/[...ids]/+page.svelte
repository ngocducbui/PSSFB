<script>
	import AddCodelessonPage from '../../../../../../../pages/AddCodeLessonPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data../../addcodelession/[...ids]/$types.js;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then course}
	<AddCodelessonPage {course} />
{:catch error}
	<div>{error.message}</div>
{/await}
