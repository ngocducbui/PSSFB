<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	export let showStatus: boolean;
	export let yesHandle: Function;
	export let content: String = 'Do you sure you want to do this.';
</script>

<Modal on:close={() => (showStatus = false)} title="Warning" bind:open={showStatus} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{content}
	</p>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={() => yesHandle()}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>Yes</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>No</button
			>
		</div>
	</svelte:fragment>
</Modal>
