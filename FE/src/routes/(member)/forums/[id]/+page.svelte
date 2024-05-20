<script lang="ts">
	import { delComment, delReplyComment, getCommentByPost } from '$lib/services/CommentService';
	import Icon from '@iconify/svelte';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import CommentContainer from '../../../../components/CommentContainer.svelte';
	import { showToast } from '../../../../helpers/helpers';
	import { getTimeDifference } from '../../../../helpers/datetime';

	export let data;
	const post: any = data.post;
	let comments: any = data.comments;
</script>

<div class="pt-10 px-40 bg-white pb-20">
	<div class="mb-10">Home > Forums > {post?.title}</div>
	<!-- <div class="flex px-32">
		<div class="w-1/12 mr-5"><Avatar classes="rounded-full" src={post?.picture} /></div>
		<div class="w-10/12">
			<div class="text-2xl mb-3">{post?.title}</div>
			<div class="mb-5">
				<span class="mr-4">By: {post?.userName}</span> Last update: {post?.lastUpdate}
			</div>
			<div class="text-xl mb-5">{post?.description}</div>
			<div class="mb-5">
				{@html post?.postContent}
			</div>
			
		</div>
	</div> -->
	<div>
		<p class="text-3xl">{post?.title}</p>
		<div class="text-gray-700 text-xs mb-10">
			<p class="ml-2">Create At: {getTimeDifference(post?.lastUpdate)}</p>
		</div>
	</div>
	<div class="py-5 flex border-2 border-gray-200">
		<div class="flex flex-col items-center px-10">
			<p class="text-md text-center pb-1 truncate max-w-40">{post?.userName}</p>
			<div class="w-20 h-20">
				<Avatar classes="rounded-full w-full h-full" src={post?.picture} />
			</div>
		</div>
		<div class="bg-gray-100 w-full px-10 mr-10 py-5 overflow-hidden">
			<div>
				<div class="mx-5 break-words">
					{@html post?.postContent}
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-end text-neutral-500 text-lg mt-3 p-1 hover:text-blue-600">
		<button
			class="flex items-center"
			on:click={() => {
				const currentUrl = window.location.href;
				navigator.clipboard.writeText(currentUrl).then(() => {
					showToast('URL copied to clipboard', 'URL copied to clipboard', 'info');
				});
			}}>Share <Icon class="text-3xl" icon="mdi:share" /></button
		>
	</div>
	<div>
		<CommentContainer
			type="post"
			postId={post.id}
			bind:comments
			getComment={() => getCommentByPost(post.id)}
		/>
	</div>
</div>
