<script lang="ts">
	import { Label, Textarea } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { currentUser, pageStatus } from '../stores/store';
	import Button from '../atoms/Button.svelte';
	import { checkExist, showToast } from '../helpers/helpers';
	import { createAdminPost, putPost } from '$lib/services/ForumsServices';
	import { createPost, sendPostToModeration, updateModPost } from '$lib/services/ModerationServices';
	import { goto } from '$app/navigation';

	export let post: any;
	export let type = 'approved';

	const savePost = async () => {
		if (!checkExist(post.title) || !checkExist(post.description) || !checkExist(post.postContent)) {
			showToast('Save Post', 'Enter all required fields', 'warning');
		} else {
			pageStatus.set('load');
			try {
				post.lastUpdate = new Date().toISOString();
				if (type == 'approved') {
					const { id, title, description, postContent } = post;
					const response = await putPost({ postId: id, title, description, postContent });
					showToast('Save Post', 'update post success', 'success');
					console.log(response);

					console.log(JSON.stringify({ postId: id, title, description, postContent }));
				} else if (type == 'pending') {
					const response = await updateModPost(post);
					showToast('Save Post', 'update post success', 'success');
					console.log(response);
					sendPostToModeration(post.id)
					console.log(JSON.stringify(post));
				}
			} catch (error) {
				console.log(error);
			}
			goto('/forums')
			pageStatus.set('done');
		}
	};
</script>

<div class="px-20 py-10">
	<div class="flex items-center mb-10">
		<div class="w-1/12 mr-5"><Avatar classes="rounded-full" src={$currentUser?.photoURL} /></div>
		{$currentUser?.displayName}
	</div>
	<div class="mb-10">
		<Label>Title</Label>
		<Input required={true} bind:value={post.title} classes="border w-full" placehoder="Title" />
	</div>

	<div class="mb-10">
		<Label>Description</Label>
		<Textarea required bind:value={post.description} placehoder="Description" />
	</div>

	<div class="mb-10">
		<Label>Content</Label>
		<Editor
			bind:value={post.postContent}
			apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
		/>
	</div>
	<div class="flex justify-end"><Button onclick={savePost} content="Save" /></div>
</div>
