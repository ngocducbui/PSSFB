<script lang="ts">
	import { toasts, ToastContainer, FlatToast, BootstrapToast } from 'svelte-toasts';
	import { Button, Modal } from 'flowbite-svelte';
	import Input from '../../atoms/Input.svelte';
	import { resetPasswordWithEmail } from '../../firebase';
	import { checkExist, isValidEmail, showToast } from '../../helpers/helpers';
	import { checkEmail } from '$lib/services/AuthenticationServices';

	export let showModal=false;
	export let onClose = () => {};
	let email = '';
	const resetPass = async () => {
		if (checkExist(email) && isValidEmail(email)) {
			const result = await checkEmail(email)
			console.log('result',result)
			if(result?.msgCode=="MSG06"){
				await resetPasswordWithEmail(email);
				showToast('Reset Password', 'Check your email to change the password', 'info')
			}else{
				showToast('Reset Password', 'Email do not exist', 'error');
			}
			
           
		} else {
			showToast('Reset Password', 'Invalid email', 'error');
		}
	};

	const emailChange = (event: any) => {
		email = event.target.value;
	};
</script>

<Modal class="z-50" title="Reset Password" bind:open={showModal} on:close={onClose} autoclose>
	<Input
		onChange={emailChange}
		classes="border text-black w-full"
		placehoder="email"
		value={email}
	/>
	<svelte:fragment slot="footer">
		<Button on:click={resetPass}>Reset Password</Button>
		<Button color="alternative">Close</Button>
	</svelte:fragment>
</Modal>

