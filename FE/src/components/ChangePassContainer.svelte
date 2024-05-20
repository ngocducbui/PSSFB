<script lang="ts">
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	import Button from '../atoms/Button.svelte';

	import Input from '../atoms/Input.svelte';
	import PasswordInput from '../atoms/PasswordInput.svelte';
	import { checkExist, checkPasswords, showToast } from '../helpers/helpers';
	import { changePasswordWithEmail, loginWithEmailAndPsr, logout } from '../firebase';
	import { get } from 'svelte/store';
	import { currentUser, pageStatus } from '../stores/store';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { redirect } from '@sveltejs/kit';

	let old = '';
	let verify = '';
	let newP = '';

	let status = '';
	let errMessage = '';

	const oldChange = (event: any) => (old = event.target.value);
	const verifyChange = (event: any) => (verify = event.target.value);
	const newChange = (event: any) => (newP = event.target.value);

	const changePass = async () => {

		if(!checkPasswords(newP)){
			showToast(
				'Password warning',
				'password must be 8-32 character long contain 1 number and 1 special character',
				'warning'
			);
			return
		}

		if(newP != verify){
			showToast(
				'Password warning',
				'password and re-password are unmatch',
				'warning'
			);
			return
		}


		pageStatus.set('load');
		if (checkExist(old) && checkExist(newP)) {
			const user: any = await get(currentUser);

			if (!checkExist(user)) goto('/');

			const testUser: any = await loginWithEmailAndPsr(user.email, old);
			console.log(testUser);
			if (checkExist(testUser)) {
				if (testUser?.email == user.email) {
					changePasswordWithEmail(newP)
					showToast('Change Password', 'Change password successfully', 'success');
					currentUser.set(undefined);
					logout();
					pageStatus.set('done');
					goto('/');
				}
			} else {
				showToast('Change Password', 'Password is incorrect', 'error');
			}
		} else {
			showToast('Change Password', 'Please enter old password and new password', 'warning');
		}
		pageStatus.set('done');
	};
</script>

<div class="min-h-[calc(100vh-96px)]">
	<div class="">
		<PasswordInput
			value={old}
			onChange={oldChange}
			classes="w-2/3 ml-10 mt-5 mb-7"
			placehoder="old password"
		/>
		<PasswordInput
			value={newP}
			onChange={newChange}
			classes="w-2/3 ml-10  mb-7"
			placehoder="new password"
		/>
		<PasswordInput
			value={verify}
			onChange={verifyChange}
			classes="w-2/3 ml-10  mb-7 "
			placehoder="verify password"
		/>

		<div class="flex justify-end w-2/3 ml-10">
			<Button onclick={changePass} content="change password" />
		</div>
	</div>
</div>

<ToastContainer placement="top-right" let:data>
	<FlatToast {data} />
	<!-- Provider template for your toasts -->
</ToastContainer>
