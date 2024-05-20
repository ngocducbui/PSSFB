<script>
	import EditCodelessonPage from '../../../../../../../pages/EditCodeLessonPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<EditCodelessonPage {data} />
{:catch error}
	<div>{error.message}</div>
{/await}
