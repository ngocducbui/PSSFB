<script lang="ts">
	import { Modal, Select, Textarea } from 'flowbite-svelte';
	import CourseContainer from '../components/CourseContainer.svelte';
	import Button from '../atoms/Button.svelte';
	import Pagination from '../components/Pagination.svelte';
	import { approveCourse, getAllModCourse, reject } from '$lib/services/ModerationServices';
	import Input from '..//atoms/Input.svelte';
	import { pageStatus } from '../stores/store';
	import { showToast } from '../helpers/helpers';
	import { tags } from '../data/data';

	export let result: any;
	$: courses = result.items;
	let searchStr = '';
	let rejectModal = false;
	let moderationId = 0;
	let reasonWhyReject = '';
	let tag = 'All';

	const pagiClick = async (page: number) => {
		result = await getAllModCourse(tag, searchStr, page);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load');
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllModCourse(tag, searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done');
	};

	const tagChange = async () => {
		pageStatus.set('load');

		try {
			result = await getAllModCourse(tag);
		} catch (err) {
			console.log(err);
		}

		pageStatus.set('done');
	};

	const ApproveCourse = async (id: number) => {
		try {
			pageStatus.set('load');
			const response = await approveCourse(id);
			console.log(response);
			result = await getAllModCourse();
			pageStatus.set('done');
			showToast('Approved course', 'Approved post course', 'success');
		} catch (error) {
			console.error(error);
			showToast('Approved course', 'Something went wrong', 'error');
		}
	};

	const RejectCourse = async (id: number) => {
		moderationId = id;
		rejectModal = true;
	};
</script>

<div class="flex justify-between items-center">
	<Input
		onKeyDown={searchFunc}
		bind:value={searchStr}
		classes="w-1/4 mr-3 border mb-5"
		placehoder="search"
	/>
	<div class="w-2/12"><Select on:change={tagChange} items={tags} bind:value={tag} /></div>
</div>

<div class="flex flex-wrap w-full items-center py-10">
	{#each courses as c}
		<div class="w-1/3 p-5">
			<CourseContainer type="admin" course={c} {ApproveCourse} {RejectCourse} />
		</div>
	{/each}
</div>

<Pagination pagi={result} {pagiClick} />

<Modal title="Rejection" bind:open={rejectModal} on:close={() => (rejectModal = false)} autoclose>
	<div>Reject reason:</div>
	<Textarea bind:value={reasonWhyReject} />
	<svelte:fragment slot="footer">
		<Button
			onclick={async () => {
				try {
					pageStatus.set('load');
					const response = await reject({ moderationId, reasonWhyReject });
					console.log(response);
					result = await getAllModCourse();
					pageStatus.set('done');
					showToast('Reject course', 'Reject course success', 'success');
				} catch (error) {
					console.error(error);
					showToast('Reject course', 'Something went wrong', 'error');
				}
			}}
			classes="text-red-500"
			content="Reject"
		/>
		<Button content="Cancel" />
	</svelte:fragment>
</Modal>
