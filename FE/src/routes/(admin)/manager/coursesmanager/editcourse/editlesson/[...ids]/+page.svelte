<script>
	import EditlessonPage from '../../../../../../../pages/EditLessonPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<EditlessonPage {data} />
{:catch error}
	<div>{error.message}</div>
{/await}
