<script>
	import EditExamPage from '../../../../../../../pages/EditExamPage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<EditExamPage {data} />
{:catch error}
	<div>{error.message}</div>
{/await}