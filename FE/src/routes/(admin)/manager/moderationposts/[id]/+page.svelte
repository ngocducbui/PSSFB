<script lang="ts">
	import { approvedPost, getAllModPosts, rejectPost } from '$lib/services/ModerationServices';
	import { Modal } from 'flowbite-svelte';
	import Avatar from '../../../../../atoms/Avatar.svelte';
	import Button from '../../../../../atoms/Button.svelte';
	import WarningPopUp from '../../../../../components/modals/WarningPopUp.svelte';
	import { getTimeDifference } from '../../../../../helpers/datetime';
	import { showToast } from '../../../../../helpers/helpers';
	import { pageStatus, currentUser } from '../../../../../stores/store';
	import { goto } from '$app/navigation';

	export let data;
	const post: any = data.post;

	let showRejectWarning = false;
	let showApproveWarning = false;
	let rejectReazon: string = '';

	const ApprovePost = async () => {
		try {
			pageStatus.set('load');
			const response = await approvedPost(post.id);
			pageStatus.set('done');
			showToast('Approved post', 'Approved post success', 'success');
			goto('/manager/moderationposts');
		} catch (error) {
			console.error(error);
			showToast('Approved post', 'Something went wrong', 'error');
		}
	};

	const RejectPost = async () => {
		try {
			pageStatus.set('load');
			console.log(post);
			const response = await rejectPost(post.id, rejectReazon);
			pageStatus.set('done');
			showToast('Reject post', 'Reject post success', 'success');
			goto('/manager/moderationposts');
		} catch (error) {
			console.error(error);
			showToast('Reject post', 'Something went wrong', 'error');
		}
	};
</script>

<div class="pt-10 w-[90%] m-auto">
	<div>
		<p class="text-3xl break-words">{post?.title}</p>
		<div class="text-gray-700 text-xs mb-10">
			<p class="">Create At: {getTimeDifference(post?.lastUpdate)}</p>
		</div>
	</div>
	<div class="py-5 flex border-2 border-gray-200">
		<div class="flex flex-col items-center px-10">
			<p class="text-md text-center pb-1 truncate max-w-40">{post?.userName}</p>
			<div class=" w-20 h-20">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="rounded-full w-full h-full" src={post?.userPicture} />
			</div>
		</div>
		<div class="bg-gray-100 flex-grow px-10 mr-10 py-5 overflow-hidden">
			<div>
				<div class="mx-5 break-words">
					{@html post?.postContent}
				</div>
			</div>
		</div>
	</div>
	<button
		on:click={() => (showApproveWarning = true)}
		class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md float-end mt-5 ml-3"
		>Approve</button
	>
	<button
		on:click={() => (showRejectWarning = true)}
		class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md float-end mt-5">Reject</button
	>
</div>

<WarningPopUp
	bind:showStatus={showApproveWarning}
	yesHandle={ApprovePost}
	content="Do you realy want to approve this post"
/>

<Modal
	on:close={() => (showRejectWarning = false)}
	title="Reject"
	bind:open={showRejectWarning}
	autoclose
>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Why you want reject this post
	</p>
	<input bind:value={rejectReazon} class="border-2 border-gray-400 py-2 px-4 rounded-md w-full" />
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={RejectPost}
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
