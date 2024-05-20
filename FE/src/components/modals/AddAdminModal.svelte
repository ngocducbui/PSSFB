<script lang="ts">
	import { Label, Modal } from 'flowbite-svelte';
	import Input from '../../atoms/Input.svelte';
	import Dropzone from 'svelte-file-dropzone';
	import PasswordInput from '../../atoms/PasswordInput.svelte';
	import { checkExist, checkPasswords, checkUserName, isImage, isValidEmail, showToast } from '../../helpers/helpers';
	import { pageStatus } from '../../stores/store';
	import { getURL, registerWithEmailAndPsr, uploadImage } from '../../firebase';
	import { AddAdmin } from '$lib/services/AuthenticationServices';
	import Button from '../../atoms/Button.svelte';

	export let showModal = false;
	export let onClose = () => {};
	export let afterAdd = async () => {};

	const admin = {
		userName: '',
		password: '',
		email: '',
		picture: ''
	};

	let image: any;
	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		if (isImage(acceptedFiles[0]?.path)) {
			image = acceptedFiles[0];
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				// Create an image element or use a dedicated image component
				const imageE: any = document.getElementById('img');
				imageE.classList.remove('hidden');
				imageE.src = reader.result;
				imageE.alt = image.name;
				// Append the image to a container element in your UI
			});
			reader.readAsDataURL(image);
		}

		console.log(image);
	}

	const addAdmin = async () => {
		if (!checkExist(image)) {
			showToast('Add Admin', 'Please upload image', 'warning');
			return;
		}

        if(!checkUserName(admin.userName)){
            showToast('Add Admin', 'Username must be 8-32 characters', 'warning');
            return;
        }

        if(!checkPasswords(admin.password)){
            showToast('Add Admin', 'Password must be 8-32 characters contains 1 number, 1 uppercase and 1 special character ', 'warning');
            return;
        }

        if(!isValidEmail(admin.email)){
            showToast('Add Admin', 'Invalid email', 'warning');
            return;
        }
        showModal = false;
		pageStatus.set('load');
		await uploadImage(image);
		const url = await getURL(image?.path);
		if (!checkExist(url)) {
			showToast('Add Admin', 'something went wrong', 'error');
		} else {
			admin.picture = url;
			console.log(JSON.stringify(admin));
			try {
				await registerWithEmailAndPsr(admin.email, admin.password, admin.userName);
				const response = await AddAdmin(admin);
				console.log(response);
				await afterAdd();
				showToast('Add Admin', 'Add Admin success full', 'success');
			} catch (error: any) {
				console.error(error);
				showToast('Add Admin', error.message, 'error');
			}
		}
       
		pageStatus.set('done');
	};
</script>

<Modal class="z-50" title="Add Admin Bussiness" bind:open={showModal} on:close={onClose} >
	<Label>Email</Label>
	<Input classes="border text-black w-full" placehoder="email" bind:value={admin.email} />
	<Label>UserName</Label>
	<Input classes="border text-black w-full" placehoder="username" bind:value={admin.userName} />
	<Label>Password</Label>
	<PasswordInput
		classes="border text-black w-full"
		placehoder="password"
		bind:value={admin.password}
	/>
	<Label>Picture</Label>
	<div class="border-2 rounded-sm border-gray-400 mb-5">
		<Dropzone containerClasses="" on:drop={handleFilesSelect} />
	</div>
	<img class="w-1/3 ml-4 mb-5 hidden" id="img" alt="img" />
	<svelte:fragment slot="footer">
		<Button onclick={addAdmin} content="Create Admin" />
	</svelte:fragment>
</Modal>
