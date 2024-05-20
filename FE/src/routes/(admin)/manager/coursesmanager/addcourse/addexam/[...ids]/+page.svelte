<script>
	import AddExampage from '../../../../../../../pages/AddExampage.svelte';
	import LoadingPage from '../../../../../../../pages/LoadingPage.svelte';

	export let data;
	const promise = data.promise;
</script>

{#await promise}
	<LoadingPage />
{:then data}
	<AddExampage {data} />
{:catch error}
	<div>{error.message}</div>
{/await}
