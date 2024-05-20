<script>
	import ForumsPage from "../../../pages/ForumsPage.svelte";
	import LoadingPage from "../../../pages/LoadingPage.svelte";

	export let data;
	const promise = data.promise
</script>

{#await promise}
	<LoadingPage />
{:then result} 
	<ForumsPage {result}/>
{/await}