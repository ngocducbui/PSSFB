<script lang="ts">
	import { GetAllStudent } from '$lib/services/UserAuthenticationService.js';
	import { onMount } from 'svelte';
	import Loading from '../../../../components/Loading.svelte';
	import type { GetAllStudentType } from '../../../../types/param/GetAllStudent.js';
	import { goto } from '$app/navigation';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import { page } from '$app/stores';
	import { formatDate, formatDateTime } from '../../../../helpers/datetime';

	let data: any;
	let user: any = [];
	let totalPages: number;
	let pageNumber: number;
	let remainPage: number;

	let searchName = '';
	let selectStatus: string = '';

	//Mount and set up data
	onMount(async () => {
		// @ts-ignore
		const paginators = $page.state.paginators;
		if (paginators) {
			pageNumber = paginators.pageNumber;
			searchName = paginators.searchStr;
			selectStatus = paginators.status;
		}
		const result = await GetAllStudent(setParam(pageNumber));
		data = result;
	});

	$: if (data) {
		user = data?.items;
		totalPages = data?.totalPages;
		pageNumber = data?.pageNumber;
		remainPage = totalPages - pageNumber;
		if (remainPage < 6) remainPage = 5;
	}

	const tableHeader = [
		{ label: 'Full Name', map: 'fullName' },
		{ label: 'Email', map: 'email' },
		{
			label: 'Birthdate',
			map: 'birthDate',
			formatData: (data: any) => {
				return formatDate(data);
			}
		},
		{
			label: 'Status',
			map: 'status',
			formatData: (data: boolean | null) => {
				return formatStatus(data);
			}
		}
	];

	//Format data
	const formatStatus = (data: boolean | null) => {
		if (data === true) {
			return '<span class="flex w-3 h-3 m-1 bg-green-600 rounded-full"></span><span class="active">Active</span>';
		} else {
			return '<span class="flex w-3 h-3 m-1 bg-red-600 rounded-full"></span><span class="deactive">Deactive</span>';
		}
	};

	//Paginators event

	const setParam = (pageNumber: number = 1) => {
		const result: GetAllStudentType = {
			pageNumber: pageNumber,
			searchStr: searchName,
			status: selectStatus
		};
		return result;
	};

	const nextEvent = async () => {
		const result = await GetAllStudent(setParam(pageNumber + 1));
		data = result;
	};

	const previousEvent = async () => {
		const result = await GetAllStudent(setParam(pageNumber - 1));
		data = result;
	};

	const moveEvent = async (pageNumber: number) => {
		const result = await GetAllStudent(setParam(pageNumber));
		data = result;
	};

	const searchEvent = async () => {
		const result = await GetAllStudent(setParam());
		data = result;
	};

	const handleStatusChange = async (event: Event) => {
		const result = await GetAllStudent(setParam());
		data = result;
	};

	$: if (searchName) {
		searchEvent();
	}

	//navigation
	const navigationDetailUser = (userId: number) => {
		goto(`/manager/usermanager/detail/${userId}`, { state: { paginators: setParam(pageNumber) } });
	};
</script>

<main class="mx-5">
	<!-- Search input -->
	<div class="relative w-full md:w-[90%] flex justify-end m-auto md:pt-5 pt-3">
		<div class="mr-4 md:mr-6">
			<select
				id="status"
				bind:value={selectStatus}
				on:change={(e) => handleStatusChange(e)}
				class="block w-full pl-2 md:pl-4 md:pt-3 md:pb-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
			>
				<option value="" selected>
					<p>All</p>
				</option>
				<option value="true">Active</option>
				<option value="false">Deactive</option>
			</select>
		</div>

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
					bind:value={searchName}
					id="default-search"
					class="block w-full px-4 pt-2 pb-3 md:py-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search by gmail"
					autocomplete="off"
				/>
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
			<thead class="text-xs text-white uppercase bg-green-700">
				<tr>
					<th class="px-3 py-3 md:px-6 md:py-5 border-gray-400 border-r-2 border-l-2"
						><div class="flex items-center justify-center">Avatar</div></th
					>
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
					{#each user as row, rowIndex}
						<tr class="border-b {rowIndex % 2 == 1 ? 'bg-green-200' : 'bg-write'}">
							<td class=" border-gray-200 border-r-2">
								<div class="flex justify-center items-center">
									<Avatar classes=" w-10 h-10" src={row?.profilePict} />
								</div>
							</td>
							{#each tableHeader as head, colIndex}
								<td class="border-gray-200 border-r-2">
									<div class="flex items-center justify-center">
										{#if head.formatData}
											{@html head.formatData(row[head.map])}
										{:else}
											{row[head.map]}
										{/if}
									</div>
								</td>
							{/each}
							<td class="px-6 py-4 flex justify-center">
								<button
									on:click={() => navigationDetailUser(row.id)}
									class="bg-blue-700 text-white py-2 px-3 rounded-lg hover:bg-blue-900"
									>Detail</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			{:else}
				<tr>
					<td class="py-4"><Loading /></td>
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
								{i + 1 == pageNumber ? 'bg-green-600 text-white' : 'bg-blue-50 text-blue-600'}">{i + 1}</button
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
			{i == 0 ? 'bg-green-600 text-white' : 'bg-blue-50 text-blue-600'}">{pageNumber + i}</button
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
										? 'bg-green-600 text-white'
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
