<script lang="ts">
	import Icon from '@iconify/svelte';
	import { pageStatus } from '../stores/store';

	export let pagi: any;
	export let pagiClick: any;
	const btnClick = async (page: number) => {
		pageStatus.set('load');
		await pagiClick(page);
		pageStatus.set('done');
	};
</script>

<div class="flex justify-center items-center py-5">
	{#if pagi?.pageNumber}
		{#if pagi.pageNumber != 1}
			<button
				class="p-3 text-lg"
				on:click={() => {
					btnClick(1);
				}}><Icon icon="fluent:arrow-previous-12-filled" style="color: #5fbdf7" /></button
			>
		{/if}
		{#if pagi.pageNumber - 1 > 0}
			<button
				class="p-3 text-lg"
				on:click={() => {
					btnClick(pagi.pageNumber - 1);
				}}>{pagi.pageNumber - 1}</button
			>
		{/if}
		<button
			class="text-blue-500 p-3 text-lg"
			on:click={() => {
				btnClick(pagi.pageNumber);
			}}>{pagi.pageNumber}</button
		>
		{#if pagi.pageNumber + 1 < pagi.totalPages}
			<button
				class="p-3 text-lg"
				on:click={() => {
					btnClick(pagi.pageNumber + 1);
				}}>{pagi.pageNumber + 1}</button
			>
		{/if}
		{#if pagi.pageNumber + 2 < pagi.totalPages}
			<button
				class="p-3 text-lg"
				on:click={() => {
					btnClick(pagi.pageNumber + 2);
				}}>{pagi.pageNumber + 2}</button
			>
		{/if}
		{#if pagi.pageNumber + 2 < pagi.totalPages - 2}
			<div>...</div>
		{/if}
		{#if pagi.pageNumber < pagi.totalPages}
			<button
				class="p-3 text-lg"
				on:click={() => {
					btnClick(pagi.totalPages);
				}}>{pagi.totalPages}</button
			>
		{/if}
		{#if pagi.pageNumber != pagi.totalPages && pagi.pageNumber < pagi.totalPages}
			<button
				class="p-3 text-lg"
				on:click={() => {
					btnClick(pagi.totalPages);
				}}><Icon icon="fluent:arrow-next-12-filled" style="color: #5fbdf7" /></button
			>
		{/if}
	{/if}
</div>
