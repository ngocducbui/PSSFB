<script lang="ts">
	import { goto } from '$app/navigation';
	import { deletePost, getAllPost, getAllPostByUserId } from '$lib/services/ForumsServices';
	import { toasts } from 'svelte-toasts';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import Pagination from '../../../../components/Pagination.svelte';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import { checkExist, showToast } from '../../../../helpers/helpers';
	import { t } from '../../../../translations/i18n';
	import { getTimeDifference } from '../../../../helpers/datetime';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let result:any;
	$: posts = result?.items??[];
	let searchStr = '';

    onMount(() => {
        getAllPostByUserId($currentUser?.UserID).then((rs:any) => {
            result = rs
        })
    })
	const pagiClick = async (page: number) => {
		result = await getAllPostByUserId($currentUser?.UserID, searchStr, page);
	};
	const searchFunc = async (event: any) => {
		pageStatus.set('load');
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getAllPostByUserId($currentUser?.UserID, searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done');
	};
</script>

<div class="bg-neutral-100 px-20">
	<div class="mb-10">{$t('Home')} > {$t('Forums')}</div>
	<div class="flex justify-between items-center">
		<Input
			onKeyDown={searchFunc}
			bind:value={searchStr}
			classes="mb-10 w-1/4 border-2 border-gray-300 focus:border-none"
			placehoder={$t('search')}
		/>
		
	</div>
	{#if checkExist($currentUser)}
		<div class="flex justify-between pr-5 items-center mb-5">
			<div class="flex">
				<a
					class="py-3 px-5 {$page.url.pathname.includes('myapprovedposts')
						? 'bg-white text-blue-500'
						: 'bg-blue-500 text-white hover:bg-blue-600'} rounded-lg font-medium shadow-lg mr-5"
					href="/myapprovedposts">{$t('My Approved Posts')}</a
				>
				<a
					class="py-3 px-5 {$page.url.pathname.includes('mypendingposts')
						? 'bg-white text-blue-500'
						: 'bg-blue-500 text-white hover:bg-blue-600'} rounded-lg font-medium shadow-lg mr-5"
					href="/mypendingposts">{$t('My Pending Posts')}</a
				>
				<a
					class="py-3 px-5 {$page.url.pathname.includes('forums')
						? 'bg-white text-blue-500'
						: 'bg-blue-500 text-white hover:bg-blue-600'}  rounded-lg font-medium shadow-lg mr-5"
					href="/forums">{$t('Forums')}</a
				>
			</div>
			<a
				class="py-3 px-5 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium shadow-lg text-white"
				href="/addpost">{$t('Add Post')}</a
			>
		</div>
	{/if}
	<div>
		{#if posts?.length > 0}
			{#each posts as p}
				<div
					class="bg-white border-4 flex justify-between py-4 px-10 mb-5 rounded-sm shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.03] hover:border-green-300"
				>
					<div class="w-16 flex items-center">
						<Avatar classes="rounded-full w-16 h-16" src={p?.picture} />
					</div>
					<div class="w-10/12">
						<div
							role="button"
							tabindex="0"
							on:keydown={() => goto(`forums/${p.id}`)}
							on:click={() => goto(`forums/${p.id}`)}
							class="text-lg font-semibold hover:underline"
						>
							{p.title}
						</div>
						<hr class="my-2" />
						<div class="overflow-hidden whitespace-normal mb-2">
							<p class="line-clamp-2">{p.description}</p>
						</div>
						<div class="text-sm mb-3">
							<span class="mr-5">By: {p.userName}</span><span
								>{$t('Last Update')}: {getTimeDifference(p.lastUpdate)}</span
							>
						</div>
						<div>
							{#if $currentUser?.UserID == p.createdBy}
								<span class="mr-5 text-blue-500"
									><button
										on:click={() => {
											if ($currentUser.Role.includes('Admin')) {
												goto(`/manager/postmanager/editpost/${p.id}`);
											} else {
												goto(`/editpost/${p.id}`);
											}
										}}>{$t('Edit')}</button
									></span
								>
								<span class="mr-5 text-red-500"
									><button
										on:click={async () => {
											pageStatus.set('load');
											await deletePost(p.id);
											result = await getAllPost();
											showToast('Delete Post', 'Delete post successfully', 'success');
											pageStatus.set('done');
										}}>{$t('Delete')}</button
									></span
								>
							{/if}
						</div>
						<!-- <div>
					{#each p.tag as t}
						<span class="px-3 py-1 mr-2 rounded-lg bg-neutral-200">{t}</span>
					{/each}
				</div> -->
					</div>
					<div class="w-1/12"></div>
				</div>
			{/each}
		{:else}
			<div class="py-4">There are no post</div>
		{/if}
	</div>
	<Pagination pagi={result} {pagiClick} />
</div>