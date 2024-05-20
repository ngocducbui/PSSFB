<script>
	import { Label, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { currentUser, pageStatus } from '../stores/store';
	import Button from '../atoms/Button.svelte';
	import { checkExist, checkTitle, showToast } from '../helpers/helpers';
	import { createAdminPost } from '$lib/services/ForumsServices';
	import { createPost } from '$lib/services/ModerationServices';
	import { goto } from '$app/navigation';

	let post = {
		title: '',
		description: '',
		postContent: '',
		createdBy: $currentUser?.UserID,
		lastUpdate: new Date().toISOString()
	};

	const savePost = async () => {

		if(!checkTitle(post.title)){
			showToast('Save Post',"Enter title shorter than 256 char")
			return
		}
		
		if (!checkExist(post.title) || !checkExist(post.description) || !checkExist(post.postContent)) {
			showToast('Save Post', 'Enter all required fields', 'warning');
		} else {
			pageStatus.set('load');
			try {
				post.lastUpdate = new Date().toISOString();
				if ($currentUser?.Role.includes('Admin')) {
					const response = await createAdminPost(post);
					showToast('Save Post', 'create post success', 'success');
					console.log(response);
				} else if ($currentUser?.Role.includes('Student')) {
					const response = await createPost(post);
					console.log(response);
					showToast('Save Post', 'create post success, wait for admin approve ', 'info');
				}
				console.log(JSON.stringify(post));
			} catch (error) {
				console.log(error);
			}
			goto('/forums');
			pageStatus.set('done');
		}
	};
</script>

<div class=" relative md:px-40 px-3 md:py-10">
	<button
		on:click={() => {
			window.history.back();
		}}
		class="absolute top-0 right-2 border-2 border-gray-200 h-fit p-1 rounded-md hover:bg-gray-300"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" {...$$props}>
			<path
				fill="currentColor"
				d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
			/>
		</svg>
	</button>
	<div class="flex justify-between">
		<div class="flex items-center mb-5 md:mb-10">
			<div class=" mr-5">
				<Avatar classes="rounded-full md:w-20 md:h-20 w-12 h-12" src={$currentUser?.photoURL} />
			</div>
			{$currentUser?.displayName}
		</div>
	</div>
	<div class="mb-3 md:mb-4">
		<Label><p class="mb-2">Title</p></Label>
		<Input required={true} bind:value={post.title} classes="border w-full" placehoder="Title" />
	</div>

	<div class="mb-3 md:mb-4">
		<Label><p class="mb-2">Description</p></Label>
		<Textarea required bind:value={post.description} placehoder="Description" />
	</div>

	<div class="mb-3 md:mb-4">
		<Label><p class="mb-2">Content</p></Label>
		<Editor
			bind:value={post.postContent}
			apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
		/>
	</div>
	<div class="flex justify-end"><Button onclick={savePost} content="Save" /></div>
</div>
