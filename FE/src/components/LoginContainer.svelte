<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from '../atoms/Input.svelte';
	import { loginWithEmailAndPsr, loginWithFacebook, loginWithGoogle } from '../firebase';
	import { currentUser, pageStatus } from '../stores/store';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import PasswordInput from '../atoms/PasswordInput.svelte';
	import ResetPasswordModal from './modals/ResetPasswordModal.svelte';
	import { checkEmail, getUserInfo, loginByGoogle } from '$lib/services/AuthenticationServices';
	import {
		checkExist,
		checkPasswords,
		decodeJWT,
		isValidEmail,
		showToast,
		trimUserData
	} from '../helpers/helpers';
	import { t } from '../translations/i18n';

	let Email = '';
	let Password = '';
	let showModal = false;

	const LWF = async () => {
		const user: any = await loginWithFacebook();
		if(user?.type=='error'){
			showToast("Login failed",user.errorMessage,'error')
			return
		}
		pageStatus.set('load');
		try {
			const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
			const decodeData: any = await decodeJWT(JWTFS);
			console.log('decodeData', decodeData);
			user.UserID = decodeData.UserID;
			const result = await getUserInfo(user.UserID);
			if (result.status == false) {
				showToast('Login Error', 'Account have been baned', 'error');
				pageStatus.set('done');
				return;
			}
			user.Role = decodeData.Roles;
			user.jwt = JWTFS;
			user.displayName = decodeData.UserName;
			user.photoURL = result.profilePict;
			currentUser.set(user);
			localStorage.setItem('user', JSON.stringify(trimUserData(user)));
			//await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));

			if (user.Role.includes('Admin')) {
				goto('/manager');
			} else {
				goto('/learning');
			}
		} catch (error) {
			console.error(error);
		}
		pageStatus.set('done');
	};

	const LWG = async () => {
		const user: any = await loginWithGoogle();
		if(user?.type=='error'){
			showToast("Login failed",user.errorMessage,'error')
			return
		}
		pageStatus.set('load');
		try {
			const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
			const decodeData: any = await decodeJWT(JWTFS);
			user.UserID = decodeData.UserID;
			const result = await getUserInfo(user.UserID);
			if (result.status == false) {
				showToast('Login Error', 'Account have been baned', 'error');
				pageStatus.set('done');
				return;
			}
			user.Role = decodeData.Roles;
			user.jwt = JWTFS;
			user.displayName = decodeData.UserName;
			user.photoURL = result.profilePict;
			localStorage.setItem('user', JSON.stringify(trimUserData(user)));
			currentUser.set(user);

			//await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));

			if (user.Role.includes('Admin')) {
				goto('/manager');
			} else {
				goto('/learning');
			}
		} catch (error) {
			console.error(error);
		}
		pageStatus.set('done');
	};

	const login = async () => {
		// if (!checkPasswords(Password)) {
		// 	showToast('Password warning', 'password must be 6 character long', 'warning');
		// 	return;
		// }

		if (!isValidEmail(Email)) {
			showToast('Email warning', 'invalid email', 'warning');
			return;
		}

		if (!checkExist(Email)) {
			showToast('Email warning', 'please input email', 'warning');
			return;
		}

		if (!checkExist(Password)) {
			showToast('Password warning', 'please input password', 'warning');
			return;
		}

		pageStatus.set('load');
		try {
			const user: any = await loginWithEmailAndPsr(Email, Password);
			if (checkExist(user)) {
				const JWTFS = await loginByGoogle(user?.email, user?.photoURL ?? '', user?.displayName);
				const decodeData: any = decodeJWT(JWTFS);
				user.UserID = decodeData.UserID;
				const result = await getUserInfo(user.UserID);
				if (result.status == false) {
					showToast('Login Error', 'Account have been baned', 'error');
					pageStatus.set('done');
					return;
				}
				user.Role = decodeData.Roles;
				user.jwt = JWTFS;
				user.displayName = decodeData.UserName;
				user.photoURL = result.profilePict;
				console.log('decoded data', decodeData);
				currentUser.set(user);
				localStorage.setItem('user', JSON.stringify(trimUserData(user)));
				//await axios.post('/?/setuser', JSON.stringify(trimUserData(user)));

				if (user.Role.includes('Admin')) {
					goto('/manager');
				} else {
					goto('/learning');
				}
			} else {
				showToast('Login', 'Wrong email or password', 'error');
			}
		} catch (error) {
			console.error(error);
		}
		pageStatus.set('done');
	};
</script>

<div class="rounded-xl px-7 py-10 bg-white text-black">
	<h3 class="font-bold text-5xl mb-8 text-center">{$t('Welcome')}</h3>
	<!-- <div class="mb-3"><Input placehoder="Username" /></div> -->

	<div class="mb-3">
		<Input
			classes="w-full border border-black"
			bind:value={Email}
			name="Email"
			placehoder="Email"
		/>
	</div>
	<div class="mb-3">
		<PasswordInput bind:value={Password} name="Password" placehoder="Password" />
	</div>
	<div class="text-right">
		<button
			on:click={() => {
				showModal = true;
			}}>{$t('forgot password')} ?</button
		>
	</div>
	<div class="my-10"></div>
	<button
		on:click={login}
		class="bg-black rounded-md justify-center p-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-black hover:bg-white transition ease-in-out w-full mb-2"
		>{$t('Login')}</button
	>

	<div class="text-center mb-4">{$t('or use another account')}</div>
	<div class="flex justify-center text-5xl">
		<div role="button" on:click={LWF} on:keydown={LWF} tabindex="0">
			<Icon icon="logos:facebook" class="mr-3" />
		</div>
		<div role="button" on:click={LWG} on:keydown={LWG} tabindex="0">
			<Icon icon="akar-icons:google-contained-fill" />
		</div>
	</div>

	<ResetPasswordModal bind:showModal onClose={() => (showModal = false)} />
</div>
