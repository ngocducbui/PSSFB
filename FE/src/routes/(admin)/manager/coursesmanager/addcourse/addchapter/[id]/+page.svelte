<script>
	import AddChapterPage from '../../../../../../../pages/AddChapterPage.svelte';
	import AddCodelessonPage from '../../../../../../../pages/AddCodeLessonPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	export let form;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then course}
	<AddChapterPage bind:form {course} />
{:catch error}
	<div>{error.message}</div>
{/await}
