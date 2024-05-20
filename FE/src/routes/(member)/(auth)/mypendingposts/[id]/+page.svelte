<script lang="ts">
	import { delComment, delReplyComment, getCommentByPost } from '$lib/services/CommentService';
	import Icon from '@iconify/svelte';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import CommentContainer from '../../../../../components/CommentContainer.svelte';
	import { showToast } from '../../../../../helpers/helpers';
	import { currentUser } from '../../../../../stores/store';

	export let data:any;
	const post: any = data.post;
</script>

<div class="pt-10 px-40 bg-white pb-20">
	<div class="mb-10">Home > Forums > {post?.title}</div>
	<div class="flex px-32">
		<div class="w-1/12 mr-5"><Avatar classes="rounded-full" src={post?.userPicture} /></div>
		<div class="w-10/12">
			<div class="text-2xl mb-3">{post?.title}</div>
			<div class="mb-5">
				<span class="mr-4">By: {post?.userName}</span> Last update: {post?.lastUpdate}
			</div>
			<div class="text-xl mb-5">{post?.description}</div>
			<div class="mb-5">
				{@html post?.postContent}
			</div>
			<!-- <div class="flex justify-end text-neutral-500 text-lg">
				<button
					class="flex items-center"
					on:click={() => {
						const currentUrl = window.location.href;
						navigator.clipboard.writeText(currentUrl).then(() => {
							showToast('URL copied to clipboard', 'URL copied to clipboard', 'info');
						});
					}}>Share <Icon class="text-3xl" icon="mdi:share" style="color: #aeadad" /></button
				>
			</div> -->
			<!-- <div class="flex">
                {#each post.tag as t}
                    <div class="px-5 py-1 rounded-lg bg-neutral-100">{t}</div>
                {/each}
            </div> -->
		</div>
	</div>
	<!-- <div>
		<CommentContainer
			type="post"
			postId={post.id}
			bind:comments
			getComment={() => getCommentByPost(post.id)}
		/>
	</div> -->
</div>
