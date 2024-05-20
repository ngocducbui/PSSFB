<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	export let content: String = 'Do you sure you want to do this.';

	let showStatus: boolean = false;
	let resolveFn: any;

	function confirm() {
		showStatus = false;
		resolveFn(true);
	}

	function cancel() {
		showStatus = false;
		resolveFn(false);
	}

	function close() {
		showStatus = false;
		resolveFn(showStatus);
	}

	export function show(): Promise<boolean> {
		showStatus = true;
		return new Promise((resolve) => {
			resolveFn = resolve;
		});
	}
</script>

<Modal on:close={close} title="Warning" bind:open={showStatus} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{content}
	</p>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={confirm}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>Yes</button
			>
			<button
				on:click={cancel}
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>No</button
			>
		</div>
	</svelte:fragment>
</Modal>
