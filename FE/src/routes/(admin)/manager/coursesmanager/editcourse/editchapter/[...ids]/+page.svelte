<script>
	import EditChapterPage from '../../../../../../../pages/EditChapterPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	export let form;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<EditChapterPage bind:form {data} />
{:catch error}
	<div>{error.message}</div>
{/await}