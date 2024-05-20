<!-- <script lang="ts">
	import {
		Modal,
		Select,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Textarea
	} from 'flowbite-svelte';

	import Button2 from '../../../../atoms/Button2.svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import {
		approvePost,
		approvedPost,
		deleteModPost,
		getAllModPosts,
		reject
	} from '$lib/services/ModerationServices';
	import { showToast } from '../../../../helpers/helpers';
	import Pagination from '../../../../components/Pagination.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Status from '../../../../atoms/Status.svelte';
	import { statuses } from '../../../../data/data';

	export let data;
	let result = data.result;
	$: Posts = result.items;

	let searchStr = '';
	let moderationId = 0;
	let reasonWhyReject = '';
	let rejectModal = false;

	const pagiClick = async (page: number) => {
		result = await getAllModPosts(searchStr, page);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load');
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllModPosts(searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done');
	};

	const statusChange = async () => {
		pageStatus.set('load')
		
			try {
				result = await getAllModPosts(status);
			} catch (err) {
				console.log(err);
			}
		
		pageStatus.set('done')
	};
	const ApprovePost = async (id: number) => {
		try {
			pageStatus.set('load');
			const response = await approvedPost(id);
			console.log(response);
			result = await getAllModPosts();
			pageStatus.set('done');
			showToast('Approved post', 'Approved post success', 'success');
		} catch (error) {
			console.error(error);
			showToast('Approved post', 'Something went wrong', 'error');
		}
	};

	const RejectPost = async (id: number) => {
		moderationId = id;
		rejectModal = true;
	};

	const DeletePost = async (id: number) => {
		try {
			pageStatus.set('load');
			const response = await deleteModPost(id);
			console.log(response);
			Posts = await getAllModPosts();
			pageStatus.set('done');
			showToast('Approved post', 'Approved post success', 'success');
		} catch (error) {
			console.error(error);
			showToast('Approved post', 'Something went wrong', 'error');
		}
	};
</script>

<div class="flex justify-between items-center">
	<Input
	onKeyDown={searchFunc}
	bind:value={searchStr}
	classes="w-1/4 mr-3 border mb-5"
	placehoder="search"
/>
</div>
<Table>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Post</TableHeadCell>
		<TableHeadCell>Description</TableHeadCell>
		<TableHeadCell>Create By</TableHeadCell>
		<TableHeadCell>Last Update</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each Posts as p, index}
			<TableBodyRow>
				<TableBodyCell>{index + 1}</TableBodyCell>
				<TableBodyCell>{p?.postTitle}</TableBodyCell>
				<TableBodyCell><div class="w-52 truncate">{p?.postDescription}</div></TableBodyCell>
				<TableBodyCell>{p?.postName}</TableBodyCell>
				<TableBodyCell>{p?.postCreateAt}</TableBodyCell>
				<TableBodyCell><Status status={p?.status}/></TableBodyCell>
				<TableBodyCell>
					

					<Button2
						onclick={() => goto(`moderationposts/${p.postId}`)}
						classes="border mr-3 text-blue-500"
						content="Detail"
					/>
					{#if p?.status != 'Accepted'}
						<Button2
							onclick={() => ApprovePost(p.postId)}
							classes="border mr-3 text-blue-500"
							content="Approve"
						/>
					{/if}

					{#if p?.status != 'Rejected'}
						<Button2
							onclick={() => RejectPost(p.id)}
							classes="border mr-3 text-red-500"
							content="Reject"
						/>
					{/if}
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
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
					result = await getAllModPosts();
					pageStatus.set('done');
					showToast('Reject post', 'Reject course post', 'success');
				} catch (error) {
					console.error(error);
					showToast('Reject post', 'Something went wrong', 'error');
				}
			}}
			classes="text-red-500"
			content="Reject"
		/>
		<Button content="Cancel" />
	</svelte:fragment>
</Modal> -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loading from '../../../../components/Loading.svelte';
	import { getAllModPosts } from '$lib/services/ModerationServices';
	import { getTimeDifference } from '../../../../helpers/datetime';

	let data: any;
	let post: any = [];
	let totalPages: number;
	let pageNumber: number;
	let remainPage: number;

	let postTitle = '';
	let selectTag: string = '';

	//Mount and set up data
	onMount(async () => {
		// @ts-ignore
		const paginators = $page.state.paginators;
		if (paginators) {
			pageNumber = paginators.pageNumber;
			postTitle = paginators.postTitle;
			selectTag = paginators.selectTag;
		}
		const result = await getAllModPosts(setParam(pageNumber));
		data = result;
	});

	//update data
	$: if (data) {
		post = data?.items ? data?.items : [];
		totalPages = data?.totalPages ? data?.totalPages : [];
		pageNumber = data?.pageNumber ? data?.pageNumber : [];
		remainPage = totalPages - pageNumber;
		if (remainPage < 6) remainPage = 5;
	}

	const tableHeader: any = [
		{ label: 'Title', map: 'postTitle' },
		{ label: 'Create By', map: 'userName' },
		{
			label: 'Create At',
			map: 'createdAt',
			formatData: (data: string) => {
				return getTimeDifference(data);
			}
		}
	];

	//Format data

	//Paginators event

	const setParam = (pageNumber: number = 1) => {
		const result: any = {
			pageNumber: pageNumber,
			postTitle: postTitle,
			tag: selectTag
		};
		return result;
	};

	const nextEvent = async () => {
		const result = await getAllModPosts(setParam(pageNumber + 1));
		data = result;
	};

	const previousEvent = async () => {
		const result = await getAllModPosts(setParam(pageNumber - 1));
		data = result;
	};

	const moveEvent = async (pageNumber: number) => {
		const result = await getAllModPosts(setParam(pageNumber));
		data = result;
	};

	const searchEvent = async () => {
		const result = await getAllModPosts(setParam());
		data = result;
	};

	const handleStatusChange = async (event: Event) => {
		const result = await getAllModPosts(setParam());
		data = result;
	};

	$: if (postTitle) {
		searchEvent();
	}

	//navigation
	const navigationDetailPost = (postId: number) => {
		goto(`/manager/moderationposts/${postId}`, {
			state: { paginators: setParam(pageNumber) }
		});
	};
</script>

<main class="mx-5">
	<!-- Search input -->
	<div class="relative w-full md:w-[90%] flex justify-between m-auto md:pt-5 pt-3">
		<div class="flex flex-grow justify-end">
			<div class="mr-4 md:mr-6"></div>

			<div class="md:w-[25%] w-[40%] min-w-[150px]">
				<div class="relative">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							class="w-4 h-4 text-gray-500"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="search"
						bind:value={postTitle}
						id="default-search"
						class="block w-full px-4 pt-2 pb-3 md:py-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Search by title"
						autocomplete="off"
					/>
				</div>
			</div>
		</div>
	</div>

	<!--Table data-->
	<div
		class="overflow-x-auto shadow-md sm:rounded-lg w-full md:w-[90%] mx-auto mt-3 md:mt-5 border-gray-300 border-2"
	>
		<table
			class="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
		>
			<thead class="text-xs text-white uppercase bg-blue-700">
				<tr>
					{#each tableHeader as item, i}
						<th class="px-3 py-3 md:px-6 md:py-5 border-gray-400 border-r-2 border-l-2">
							<div class="flex items-center justify-center">{item.label}</div>
						</th>
					{/each}
					<th class="px-3 py-3 md:px-6 md:py-5 border-gray-400 border-r-2 border-l-2"
						><div class="flex items-center justify-center">Action</div></th
					>
				</tr>
			</thead>
			{#if data}
				<tbody>
					{#each post as row, rowIndex}
						<tr class="border-b {rowIndex % 2 == 1 ? 'bg-blue-200' : 'bg-write'}">
							{#each tableHeader as head, colIndex}
								<td class="border-gray-200 border-r-2">
									<div class="flex items-center justify-center">
										{#if head?.formatData}
											{head.formatData(row[head.map])}
										{:else}
											{row[head.map]}
										{/if}
									</div>
								</td>
							{/each}
							<td class="px-6 py-4 flex justify-center">
								<button
									on:click={() => navigationDetailPost(row.postId)}
									class="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700"
									>Detail</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			{:else}
				<tr>
					{#each tableHeader as _, i}
						<td class="py-4"><Loading /></td>
					{/each}
					<td class="py-4"><Loading /></td>
				</tr>
			{/if}
		</table>

		<!--Paginators-->
		<div class="flex justify-center items-center py-5 border-t-2 border-gray-300">
			<nav style="display: inline-block;" aria-label="Page navigation example">
				<ul class="inline-flex -space-x-px text-sm">
					<li>
						<button
							disabled={pageNumber === 1}
							on:click={previousEvent}
							class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
							>Previous</button
						>
					</li>
					<!-- loading Paginators -->
					{#if data == null}
						<div class="px-2">
							<Loading />
						</div>
						<!-- Check condition if total page <=6 it mean just liat all -->
					{:else if totalPages <= 6}
						{#each Array(totalPages) as _, i}
							<li>
								<button
									on:click={() => moveEvent(i + 1)}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700
								{i + 1 == pageNumber ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}">{i + 1}</button
								>
							</li>
						{/each}
						<!-- else if total page >6 it mean me must consider to "..." label-->
					{:else if remainPage >= 6}
						{#each Array(3) as _, i}
							<li>
								<button
									on:click={() => moveEvent(pageNumber + i)}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700
			{i == 0 ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}">{pageNumber + i}</button
								>
							</li>
						{/each}
						<li>
							<div class="flex items-center justify-center px-4 h-10 border border-gray-300">
								...
							</div>
						</li>
						{#each Array(3) as _, i}
							<li>
								<button
									on:click={() => moveEvent(totalPages - (3 - i) + 1)}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 bg-blue-50 text-blue-600'"
									>{totalPages - (3 - i) + 1}</button
								>
							</li>
						{/each}
					{:else}
						<li>
							<div class="flex items-center justify-center px-4 h-10 border border-gray-300">
								...
							</div>
						</li>
						{#each Array(6) as _, i}
							<li>
								<button
									on:click={() => moveEvent(totalPages - (remainPage - i))}
									class="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700
								{totalPages - (remainPage - i) == pageNumber
										? 'bg-blue-600 text-white'
										: 'bg-blue-50 text-blue-600'}">{totalPages - (remainPage - i)}</button
								>
							</li>
						{/each}
					{/if}
					<li>
						<button
							disabled={pageNumber == totalPages}
							on:click={nextEvent}
							class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
							>Next</button
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</main>
