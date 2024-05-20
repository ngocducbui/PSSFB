<script lang="ts">
	import { Textarea } from 'flowbite-svelte';

	import Avatar from '../atoms/Avatar.svelte';
	import Button from '../atoms/Button.svelte';
	import Icon from '@iconify/svelte';
	import { currentUser, pageStatus } from '../stores/store';
	import { checkExist, showToast } from '../helpers/helpers';
	import {
		delComment,
		delReplyComment,
		postComment,
		postReplyComment,
		putComment,
		putReplyComment
	} from '$lib/services/CommentService';
	import Editor from '@tinymce/tinymce-svelte';
	import { formatDateTime } from '../helpers/datetime';
	import PopUpConfirm from './modals/PopUpConfirm.svelte';
	export let comments: any[];
	export let editcomment: any = {};
	export let editreply: any = {};
	export let getComment: any;
	export let type: string;
	export let courseId: any = undefined;
	export let postId: any = undefined;
	export let lessonId: any = undefined;
	$: replies = comments.flatMap((item) => item?.replies);
	//export let type = 'post';
	let content = '';
	let replyContent = '';
	let popUpConfirmInstance: any;

	const replyClick = (id: number) => {
		const replyFrm = document.getElementById(`replyFrm#${id}`);
		if (replyFrm?.classList.contains('hidden')) {
			replyFrm.classList.remove('hidden');
		} else {
			replyFrm?.classList.add('hidden');
		}
	};

	const editClick = (id: number) => {
		const editor = document.getElementById(`commenteditor${id}`);
		const content = document.getElementById(`commentcontent${id}`);
		if (editor?.classList.contains('hidden')) {
			const { commentContent, date, userId } = comments.find((c: any) => c.id == id);
			editcomment = { id, commentContent, date, userId };
			editor?.classList.remove('hidden');
			content?.classList.add('hidden');
		} else if (content?.classList.contains('hidden')) {
			content?.classList.remove('hidden');
			editor?.classList.add('hidden');
		}
	};

	const replyeditClick = (id: number) => {
		const editor = document.getElementById(`replyeditor${id}`);
		const content = document.getElementById(`replycontent${id}`);
		if (editor?.classList.contains('hidden')) {
			const { replyContent } = replies.find((c: any) => c.id == id);
			editreply = { replyId: id, replyContent };
			editor?.classList.remove('hidden');
			content?.classList.add('hidden');
		} else if (content?.classList.contains('hidden')) {
			content?.classList.remove('hidden');
			editor?.classList.add('hidden');
		}
	};

	async function updateComment() {
		pageStatus.set('load');
		try {
			await putComment(editcomment);
			comments = await getComment();
			showToast('Update Comment', 'Update Comment Success', 'success');
			const editor = document.getElementById(`commenteditor${editcomment.id}`);
			const content = document.getElementById(`commentcontent${editcomment.id}`);
			if (content?.classList.contains('hidden')) {
				content?.classList.remove('hidden');
				editor?.classList.add('hidden');
			}
		} catch (error) {
			console.log(error);
		}
		pageStatus.set('done');
	}

	async function updateReply() {
		pageStatus.set('load');
		try {
			console.log(JSON.stringify(editreply));
			await putReplyComment(editreply);
			comments = await getComment();
			showToast('Update Comment', 'Update Comment Success', 'success');
			const editor = document.getElementById(`replyeditor${editreply.replyId}`);
			const content = document.getElementById(`replycontent${editreply.replyId}`);
			if (content?.classList.contains('hidden')) {
				content?.classList.remove('hidden');
				editor?.classList.add('hidden');
			}
		} catch (error) {
			console.log(error);
		}
		pageStatus.set('done');
	}

	// function handleKeydown(e: any, id: number) {
	// 	if (e.key == 'Enter') {
	// 		const frm: any = document.getElementById(`rfrm${id}`);
	// 		frm.submit();
	// 	}
	// }

	async function deleteClick(id: number) {
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
		await delComment(id);
		showToast('Delete Comment', 'Delete Comment Success', 'success');
		comments = await getComment();
		pageStatus.set('done');
	}

	async function replydeleteClick(id: number) {
		if (!popUpConfirmInstance) {
			popUpConfirmInstance = new PopUpConfirm({
				target: document.body,
				props: {
					content: 'Do you want to delete this reply?'
				}
			});
		}
		const confirmed = await popUpConfirmInstance.show();
		if (!confirmed) {
			return;
		}
		pageStatus.set('load');
		await delReplyComment(id);
		showToast('Delete Comment', 'Delete Comment Success', 'success');
		comments = await getComment();
		pageStatus.set('done');
	}

	async function comment() {
		pageStatus.set('load');
		if (!checkExist(content.trim())) {
			showToast('Comment warning', 'Please enter content', 'warning');
			pageStatus.set('done');
			return;
		}
		try {
			switch (type) {
				case 'course':
					await postComment({
						courseId,
						commentContent: content,
						date: new Date().toISOString,
						userId: $currentUser.UserID
					});

					break;
				case 'post':
					await postComment({
						forumPostId: postId,
						commentContent: content,
						date: new Date().toISOString,
						userId: $currentUser.UserID
					});
					break;
				case 'lesson':
					await postComment({
						lessonId: lessonId,
						commentContent: content,
						date: new Date().toISOString,
						userId: $currentUser.UserID
					});
					break;
			}
			showToast('Comment', 'Your comment was created successfully', 'success');
			comments = await getComment();
		} catch (error) {
			console.log(error);
		}
		content = '';
		pageStatus.set('done');
	}

	async function reply(commentId: number) {
		pageStatus.set('load');
		try {
			await postReplyComment({
				commentId: commentId,
				replyContent: replyContent,
				date: new Date().toISOString,
				userId: $currentUser.UserID
			});
			comments = await getComment();
		} catch (error) {
			console.log(error);
		}
		replyClick(commentId);
		replyContent = '';
		pageStatus.set('done');
		showToast('Reply', 'Create reply success', 'success');
	}
</script>

<div>
	<div class="py-5 text-2xl">{comments?.length} Comments</div>
	{#if checkExist($currentUser)}
		<!-- <form method="POST" action="?/postcomment"> -->
		<div class="flex mb-3">
			<div class="w-10 h-10 mr-3">
				<Avatar classes="rounded-full h-full w-full" src={$currentUser?.photoURL} />
			</div>

			<Textarea bind:value={content} name="content" rows="5" />
		</div>
		<div class="flex justify-end"><Button onclick={comment} content="Post" /></div>
		<!-- </form> -->
	{/if}
	<hr class="my-5" />
	{#each comments as c}
		<div class="flex">
			<div class="mr-3 w-12 h-12">
				<Avatar classes="rounded-full w-full h-full" src={c.picture} />
			</div>
			<div>
				<div class="flex items-center">
					<div class="text-blue-500 mr-3">{c.userName}</div>
					<div class="text-neutral-400 text-xs">{formatDateTime(c.date)}</div>
				</div>
				<di id="commentcontent{c.id}">{c.commentContent}</di>
				<div class="hidden" id="commenteditor{c.id}">
					<Textarea bind:value={editcomment.commentContent} />
					<div class="flex justify-end"><Button onclick={updateComment} content="Save" /></div>
				</div>
				<div class="flex items-center">
					<!-- <Icon class="text-2xl mr-3" icon="iconamoon:like-thin" style="color: black" /> -->
					{#if checkExist($currentUser)}
						<button
							class="mr-2 text-xs text-gray-600 hover:text-blue-600"
							on:click={() => replyClick(c.id)}>Reply</button
						>
					{/if}
					{#if c?.userId == $currentUser?.UserID}
						<button
							class="mr-2 text-xs text-gray-600 hover:text-blue-600"
							on:click={() => editClick(c.id)}>Edit</button
						>
						<button class="mr-2 text-xs text-red-500" on:click={() => deleteClick(c.id)}
							>Delete</button
						>
					{/if}
				</div>
				{#if checkExist($currentUser)}
					<div id="replyFrm#{c.id}" class="mt-5 hidden">
						<!-- <form id="rfrm{c.id}" method="POST" action="?/postreply"> -->
						<div class="flex mb-3">
							<div class="h-10 w-[52px] mr-3">
								<Avatar classes="rounded-full h-full w-full" src={$currentUser?.photoURL} />
							</div>
							<input type="hidden" name="commentId" readonly value={c.id} />
							<Textarea bind:value={replyContent} rows="3" />
						</div>
						<div class="flex justify-end">
							<Button onclick={() => reply(c.id)} content="Reply" />
						</div>
						<!-- </form> -->
					</div>
				{/if}
				{#each c.replies as reply}
					<div class="flex my-3">
						<div class="w-10 h-10 mr-3">
							<Avatar classes="rounded-full w-full h-full" src={reply.userPicture} />
						</div>
						<div>
							<div class="flex items-center">
								<div class="text-blue-500 mr-3">{reply.userName}</div>
								<div class="text-neutral-400 text-xs">{formatDateTime(reply?.createDate)}</div>
							</div>
							<div id="replycontent{reply.id}">{reply.replyContent}</div>
							<div class="hidden" id="replyeditor{reply.id}">
								<Textarea bind:value={editreply.replyContent} />
								<div class="flex justify-end"><Button onclick={updateReply} content="Save" /></div>
							</div>
							<div class="flex items-center">
								{#if reply?.userId == $currentUser?.UserID}
									<button
										class="mr-2 text-xs text-gray-600 hover:text-blue-600"
										on:click={() => replyeditClick(reply.id)}>Edit</button
									>
									<button
										class="mr-2 text-xs text-red-400 hover:text-red-500"
										on:click={() => replydeleteClick(reply.id)}>Delete</button
									>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<hr class="my-5" />
	{/each}
</div>
