<script lang="ts">
	import { goto } from '$app/navigation';
	import Avatar from '../atoms/Avatar.svelte';
	import { formatDateTime, getTimeDifference } from '../helpers/datetime';
	import { t } from '../translations/i18n';
	import { currentUser, pageStatus } from '../stores/store';
	import { deletePost, getAllPost } from '$lib/services/ForumsServices';
	import { showToast } from '../helpers/helpers';
	import PopUpConfirm from './modals/PopUpConfirm.svelte';

	export let post: any;
	let popUpConfirmInstance: any;
</script>

<button on:click={() => goto(`/forums/${post.id}`)} class="w-full">
	<div
		class="bg-white border-4 flex justify-between items-center py-4 px-10 rounded-sm shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-[1.03] hover:border-green-300"
	>
		<div class="w-16 h-16 flex-shrink-0 flex items-center mr-10">
			<Avatar classes="rounded-full w-full h-full" src={post?.picture} />
		</div>
		<div class="w-10/12">
			<div
				role="button"
				tabindex="0"
				on:keydown={() => goto(`forums/${post.id}`)}
				on:click={() => goto(`forums/${post.id}`)}
				class="text-lg font-semibold hover:underline"
			>
				{post.title}
			</div>
			<hr class="my-2" />
			<div class="overflow-hidden whitespace-normal mb-2">
				<p class="line-clamp-2">{post.description}</p>
			</div>
			<div class="text-sm mb-3 text-gray-700">
				<span class="mr-5">By: {post.userName}</span><span
					>{$t('Last Update')}: {getTimeDifference(post.lastUpdate)}</span
				>
			</div>
			<div>
				{#if $currentUser?.UserID == post.createdBy}
					<span class="mr-5 text-blue-500"
						><button
							on:click={() => {
								if ($currentUser.Role.includes('Admin')) {
									goto(`/manager/postmanager/editpost/${post.id}`);
								} else {
									goto(`/editpost/${post.id}`);
								}
							}}>{$t('Edit')}</button
						></span
					>
					<span class="mr-5 text-red-500"
						><button
							on:click={async () => {
								if (!popUpConfirmInstance) {
									popUpConfirmInstance = new PopUpConfirm({
										target: document.body,
										props: {
											content: 'Do you want to delete this post?'
										}
									});
								}
								const confirmed = await popUpConfirmInstance.show();
								if (!confirmed) {
									return;
								}
								pageStatus.set('load');
								await deletePost(post.id);
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
</button>
