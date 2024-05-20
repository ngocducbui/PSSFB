<script lang="ts">
	import Icon from "@iconify/svelte";

	export let content = '';
	export let classes = '';
	export let onclick: any = () => {};
	export let type = 'default';
</script>

{#if type == 'default'}
	<button
		on:click={onclick}
		class=" bg-blue-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-blue hover:bg-blue-700 transition ease-in-out"
		>{content}</button
	>
{:else if type == 'danger'}
	<button
		on:click={onclick}
		class="{classes} bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-red-500 hover:bg-white transition ease-in-out"
		>{content} <Icon class="ml-1" icon="mdi:trash" /></button
	>
{:else if type == 'Accepted'}
	<button
		on:click={onclick}
		class="{classes} bg-white rounded-md p-3 font-medium text-lime-500 items-center inline-flex border-2 hover:-translate-x-2 hover:bg-black transition ease-in-out"
		>{content}</button
	>
{:else if type == 'Rejected'}
	<button
		on:click={onclick}
		class="{classes} bg-white rounded-md p-3 font-medium text-red-500 items-center inline-flex border-2 hover:-translate-x-2 hover:bg-black transition ease-in-out"
		>{content}</button
	>
{/if}
