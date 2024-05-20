<script lang="ts">
	import {
		Label,
		Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import Avatar from '../../../../atoms/Avatar.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import Input from '../../../../atoms/Input.svelte';
	import ChangePassContainer from '../../../../components/ChangePassContainer.svelte';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import {
		checkExist,
		checkPasswords,
		checkUserName,
		convertToVND,
		isImage,
		showToast
	} from '../../../../helpers/helpers';
	import { getURL, loginWithEmailAndPsr, logout, uploadImage } from '../../../../firebase';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { getUserInfo, updateUserInfo } from '$lib/services/AuthenticationServices';
	import Dropzone from 'svelte-file-dropzone';
	import { formatDate } from '../../../../helpers/datetime';
	import ResetPasswordModal from '../../../../components/modals/ResetPasswordModal.svelte';
	import { trimUserData } from '../../../../helpers/helpers';
	import { DateInput } from 'date-picker-svelte';
	import { getPaymentByByUserId } from '$lib/services/PaymentService';
	import LoadingPage from '../../../../pages/LoadingPage.svelte';
	import { t } from '../../../../translations/i18n';
	import { changeStatus } from '$lib/services/ModerationServices';

	let today = new Date().toISOString().split('T')[0];
	let showModal = false;
	export let form: any;
	if (form?.type == 'success') {
		showToast('Edit Profile', form.message, form.type);
	} else if (form?.type == 'error') {
		showToast('Edit Profile', form.message, form.type);
	}
	let section = 'Infomation & Contact';
	const sections = ['Infomation & Contact', 'Change Password'];
	//export let data: any;
	let userInfo: any;
	let defaultModal = false;
	let firstWM = false;
	let secondWM = false;
	let deactivePass = '';
	let editStatus = false;
	let payments: any;
	let siteBarShow = false;

	let defaultDate: any;
	let date: any;

	const onLogout = async () => {
		localStorage.removeItem('user');
		currentUser.set(undefined);
		logout();
		//await axios.post('/?/logout', JSON.stringify({}));

		goto('/');
	};

	function formatDateForInput(dateString: any) {
		const date = new Date(dateString);

		// Option 1: Adjust for specific time zone (if known)
		//   - Replace '+07:00' with the appropriate time zone offset for the original date
		date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // Adjust for +07:00 (Indochina Time)

		// Option 2: Use a library for time zone handling (recommended)
		//   - Consider moment.js or date-fns for more flexibility and accuracy

		const formattedDate = date.toISOString().slice(0, 10);
		return formattedDate;
	}

	onMount(async () => {
		if (!userInfo) {
			userInfo = await getUserInfo($currentUser.UserID);
			date = formatDateForInput(new Date(userInfo.birthDate).toJSON().slice(0, 10));
			defaultDate = formatDateForInput(new Date(userInfo.birthDate).toJSON().slice(0, 10));
			info = userInfoTrim();
		}

		payments = getPaymentByByUserId($currentUser?.UserID);
	});

	$: if (editStatus == false) {
		date = defaultDate;
		info = userInfoTrim();
	}

	let image: any;
	let info = {
		userId: userInfo?.id,
		fullname: userInfo?.fullName ?? '',
		email: userInfo?.email ?? '',
		profilePict: userInfo?.profilePict ?? '',
		username: userInfo?.userName ?? '',
		phone: userInfo?.phone ?? '',
		address: userInfo?.address ?? '',
		facebookLink: userInfo?.facebookLink ?? '',
		birthDate: date
	};

	const userInfoTrim = () => {
		return {
			userId: userInfo?.id,
			fullname: userInfo?.fullName ?? '',
			email: userInfo?.email ?? '',
			profilePict: userInfo?.profilePict ?? '',
			username: userInfo?.userName ?? '',
			phone: userInfo?.phone ?? '',
			address: userInfo?.address ?? '',
			facebookLink: userInfo?.facebookLink ?? '',
			birthDate: date
		};
	};

	// const editFrmSubmit = () => {
	// 	const editfrm: any = document.getElementById('editfrm');
	// 	editfrm.submit();
	// };

	async function frmSubmit() {
		info.birthDate = date;
		pageStatus.set('load');
		let temDate = new Date(date);
		if (temDate.getTime() > Date.now()) {
			showToast('Edit Profile', 'Date invalid', 'error');
			pageStatus.set('done');
			return;
		}
		if (!checkUserName(info.username)) {
			showToast('Edit Profile', 'username must be 8-32 characters long', 'warning');
			pageStatus.set('done');
			return;
		}
		if (checkExist(image)) {
			await uploadImage(image);
			const url = await getURL(image?.path);
			if (!checkExist(url)) {
				showToast('Edit Profile', 'something went wrong', 'error');
				pageStatus.set('done');
				return;
			}
			info.profilePict = url;
		}

		try {
			const response: any = await updateUserInfo(info.userId, info);
			console.log('re', response);
			if (response.data.statusCode == 400) {
				showToast('Profile', response.data.value.msgTextVN, 'error');
				pageStatus.set('done');
				return;
			} else {
				showToast('Profile', 'Edit profile success', 'success');
			}
			userInfo = await getUserInfo($currentUser.UserID);
			info = userInfoTrim();
			currentUser.set({
				...$currentUser,
				displayName: userInfo.userName,
				photoURL: userInfo.profilePict
			});
			localStorage.setItem('user', JSON.stringify($currentUser));
		} catch (error: any) {
			console.error(error);
		}

		pageStatus.set('done');
		defaultDate = formatDateForInput(new Date(userInfo.birthDate).toJSON().slice(0, 10));
		editStatus = false;
	}

	const editHandle = () => {
		editStatus = true;
	};

	const deleteFunc = async () => {
		if (!checkExist(deactivePass)) {
			showToast('De-active', 'Input your password', 'warning');
			return;
		}

		const user: any = await loginWithEmailAndPsr($currentUser?.email, deactivePass);
		if (checkExist(user) && user?.email == $currentUser?.email) {
			pageStatus.set('load')
			try {
				await changeStatus($currentUser.UserID, $currentUser.uid)
				currentUser.set(undefined);
				logout();
				goto('/');
				showToast('De-active', 'your account had been de-active', 'info');
			} catch (error) {
				showToast('De-active', 'something went wrong', 'error');
			}
			secondWM = false;
			onLogout();
			pageStatus.set('done')
		} else {
			showToast('De-active', 'incorrect password', 'warning');
		}
	};

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
	}
</script>

<div class="relative min-h-[calc(100vh-96px)] flex bg-gray-100 mb-2">
	<ResetPasswordModal bind:showModal />
	<button
		on:click={() => (siteBarShow = true)}
		class="absolute top-1 right-2 md:hidden block hover:text-green-500 p-1 hover:border-gray-100 hover:border-2 rounded-md"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" {...$$props}>
			<g fill="none" fill-rule="evenodd">
				<path
					d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
				/>
				<path
					fill="currentColor"
					d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414z"
				/>
			</g>
		</svg>
	</button>
	<div
		class="z-1 w-full md:w-1/6 p-5 md:rounded-xl bg-gray-100 md:bg-white border-gray-200 border-2 pt-10 md:relative fixed {siteBarShow
			? 'block'
			: 'hidden'} md:block"
	>
		<button
			on:click={() => (siteBarShow = false)}
			class="hover:text-green-500 absolute top-1 right-2 mb-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<g fill="none" fill-rule="evenodd">
					<path
						d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
					/>
					<path
						fill="currentColor"
						d="M11.293 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z"
					/>
				</g>
			</svg>
		</button>
		<div class="w-full">
			<button
				class="hover:bg-blue-200 w-full py-2 rounded-lg font-medium text-base border-gray-100 border {section ==
				'Infomation & Contact'
					? 'bg-green-100 '
					: ''}"
				on:click={() => (section = 'Infomation & Contact')}>{$t('Infomation & Contact')}</button
			>
		</div>
		<div class="w-full">
			<button
				class="hover:bg-blue-200 w-full py-2 rounded-lg font-medium text-base border-gray-100 border-2 {section ==
				'Change Password'
					? 'bg-green-100 '
					: ''}"
				on:click={() => (section = 'Change Password')}>{$t('Change Password')}</button
			>
		</div>
		{#if $currentUser?.Role == 'Student'}
			<div class="w-full">
				<button
					class="hover:bg-blue-200 w-full py-2 rounded-lg font-medium text-base border-gray-100 border-2 {section ==
					'Payment History'
						? 'bg-green-100 '
						: ''}"
					on:click={() => (section = 'Payment History')}>{$t('Payment History')}</button
				>
			</div>
		{/if}

		<div class="w-full mt-8">
			<button
				class=" hover:bg-red-600 w-full py-2 text-black rounded-lg font-medium text-base border-gray-100 border-2 bg-red-500"
				on:click={() => (firstWM = true)}>{$t('De-active account')}</button
			>
		</div>
	</div>
	<div
		class="m-auto min-h-screen h-full md:w-4/6 px-5 md:rounded-xl bg-white border-gray-200 border-2 pt-5"
	>
		{#if section == 'Infomation & Contact'}
			<div class="flex justify-between">
				<div class="flex justify-between items-center x-5">
					<p
						class="md:flex hidden font-thinner text-2xl md:text-3xl mt-5 px-5 py-2 rounded-md bg-gray-200 w-fit"
					>
						{$t('Profile')}
					</p>
				</div>
			</div>
			<div class="">
				<div class="md:mx-5 md:mt-3 mt-2 flex flex-col justify-between items-start">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<div class="flex justify-between items-end w-full">
						<img
							class="w-14 h-14 md:h-20 md:w-20 md:my-4 object-cover rounded-full"
							src={checkExist(info.profilePict)
								? info.profilePict
								: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
							id="img"
							alt="Current profile photo"
						/>
						{#if editStatus}
							<div class="flex">
								<div class="w-fit mb-4">
									<button
										class=" px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-3"
										on:click={() => frmSubmit()}>Save</button
									>
								</div>

								<div class="w-fit mb-4">
									<button
										class=" px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
										on:click={() => (editStatus = false)}>Cancel</button
									>
								</div>
							</div>
						{:else}
							<div class="w-fit md:mb-4">
								<button
									class=" px-4 py-1 md:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
									on:click={() => editHandle()}>Edit</button
								>
							</div>
						{/if}
					</div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class=" border-2 border-gray-200 w-full {editStatus ? 'block' : 'hidden'}">
						<span class="sr-only t-2">Choose profile photo</span>
						<div class="border-2 {editStatus ? 'border-blue-500' : 'border-black'}">
							<Dropzone containerClasses="" on:drop={handleFilesSelect} />
						</div>

						<!-- <input
							class="border w-2/3 hidden"
							required={true}
							name="photoURL"
							value={info?.profilePict}
						/> -->
					</label>
				</div>
				<div class="md:mx-5 md:my-5 my-3">
					<label
						class=" block md:p-3 px-2 py-2 border-2 {editStatus
							? 'border-blue-500'
							: 'border-black'} rounded"
						for="username"
					>
						<span class="text-sm md:text-md font-semibold text-zinc-900">User Name </span>
						<input
							class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							autocomplete="off"
							id="username"
							type="text"
							placeholder="Null"
							bind:value={info.username}
							disabled={editStatus ? false : true}
						/>
					</label>
				</div>
			</div>
			<div class="md:mx-5 md:my-5 my-3">
				<label
					class=" block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="fullname"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Full Name </span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="fullname"
						type="text"
						placeholder=""
						bind:value={info.fullname}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>

			<div class="flex">
				<div class="w-1/2 md:mx-5 mr-2">
					<label
						class=" block md:p-3 px-2 py-2 border-2 {editStatus
							? 'border-blue-500'
							: 'border-black'} rounded"
						for="phone"
					>
						<span class="text-sm md:text-md font-semibold text-zinc-900">Phone Number</span>
						<input
							class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							autocomplete="off"
							id="phone"
							type="text"
							placeholder=""
							bind:value={info.phone}
							disabled={editStatus ? false : true}
						/>
					</label>
				</div>
				<div class="w-1/2 md:mx-5 ml-2">
					<label
						class=" block md:px-3 md:py-2 px-2 py-[3px] border-2 {editStatus
							? 'border-blue-500'
							: 'border-black'} rounded"
						for="birthDate"
					>
						<span class="text-sm md:text-md font-semibold text-zinc-900">BirthDate</span>
						<input
							class=" bg-transparent md:p-4 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							type="date"
							bind:value={date}
							disabled={editStatus ? false : true}
							placeholder=""
							max={today}
						/>
						<!-- <input
							class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
							autocomplete="off"
							id="birthDate"
							type="text"
							placeholder="dd-MM-yyyy"
							bind:value={info.birthDate}
							disabled={editStatus ? false : true}
						/> -->
					</label>
				</div>
			</div>
			<div class="  md:mx-5 md:my-5 my-3">
				<label class=" block md:p-3 px-2 py-2 border-2 border-black" for="email">
					<span class="text-sm md:text-md font-semibold text-zinc-900">Email</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="email"
						type="text"
						placeholder=""
						bind:value={info.email}
						disabled
					/>
				</label>
			</div>

			<div class=" md:mx-5 md:my-5 my-3">
				<label
					class=" block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="address"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Address</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="address"
						type="text"
						placeholder=""
						bind:value={info.address}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>
			<div class=" md:mx-5 md:my-5 my-3">
				<label
					class=" block md:p-3 px-2 py-2 border-2 {editStatus
						? 'border-blue-500'
						: 'border-black'} rounded"
					for="fblink"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">Facebook Link</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="fblink"
						type="text"
						placeholder=""
						bind:value={info.facebookLink}
						disabled={editStatus ? false : true}
					/>
				</label>
			</div>
		{:else if section == 'Change Password'}
			<ChangePassContainer />
		{:else if section == 'Payment History'}
			{#await payments}
				<LoadingPage />
			{:then pts}
				{#if pts?.length > 0}
					<div class="pt-20">
						<div class="text-center text-3xl font-bold mb-10">{$t('Payment History')}</div>
						<Table>
							<TableHead>
								<TableHeadCell>Course</TableHeadCell>
								<TableHeadCell>Paid Date</TableHeadCell>
								<TableHeadCell>Price</TableHeadCell>
							</TableHead>
							<TableBody tableBodyClass="divide-y">
								{#each pts as p}
									<TableBodyRow>
										<TableBodyCell
											><div class="flex items-center">
												<img class="mr-3 w-1/3" alt="courseimage" src={p.coursePicture} />
												<div>{p.courseName ?? 'no information'}</div>
											</div></TableBodyCell
										>
										<TableBodyCell
											>{formatDate(p.transactionDate) ?? 'no information'}</TableBodyCell
										>
										<TableBodyCell>{convertToVND(p.money ?? 0)}</TableBodyCell>
									</TableBodyRow>
								{/each}
							</TableBody>
						</Table>
					</div>
				{:else}
					<div class="pt-5 pb-10 text-center font-medium text-blue-500 text-xl">
						You haven't buy any course
					</div>
				{/if}
			{/await}
		{/if}
	</div>
</div>

<Modal title="Edit profile" bind:open={defaultModal}>
	<form id="editfrm" on:submit={frmSubmit}>
		<div>
			<Label>FullName</Label>
			<Input classes="border w-2/3" required={true} name="fullname" bind:value={info.fullname} />
		</div>
		<div>
			<Label>Username</Label>
			<Input classes="border w-2/3" required={true} name="displayName" bind:value={info.username} />
		</div>
		<div>
			<Label>PhoneNumber</Label>
			<Input classes="border w-2/3" required={true} name="phoneNumber" bind:value={info.phone} />
		</div>
		<div>
			<Label>Address</Label>
			<Input classes="border w-2/3" required={true} name="address" bind:value={info.address} />
		</div>
		<div>
			<Label>Facebook</Label>
			<Input
				classes="border w-2/3"
				required={true}
				name="facebook"
				bind:value={info.facebookLink}
			/>
		</div>
		<div>
			<Label>Avatar</Label>
			<Dropzone containerClasses="w-2/3 ml-4 mb-5" on:drop={handleFilesSelect} />

			<img src={info.profilePict} class="w-1/3 ml-4 mb-5" id="img" alt="img" />

			<Input
				classes="border w-2/3 hidden"
				required={true}
				name="photoURL"
				value={info?.profilePict}
			/>
		</div>
	</form>
	<svelte:fragment slot="footer">
		<Button onclick={async () => frmSubmit()} content="Save" />
		<Button onclick={() => (defaultModal = false)} content="Cancel" />
	</svelte:fragment>
</Modal>

<Modal on:close={() => (firstWM = false)} title="Warning" bind:open={firstWM} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{$t('Do you sure you want to deactive your account ?')}
	</p>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={() => (secondWM = true)}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>{$t('Yes')}</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>{$t('No')}</button
			>
		</div>
	</svelte:fragment>
</Modal>

<Modal on:close={() => (secondWM = false)} title="Warning" bind:open={secondWM}>
	<div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{$t('Confirm again to deactive')}
	</div>
	<Label>{$t('Password')}</Label>
	<input
		type="password"
		bind:value={deactivePass}
		placeholder="Password"
		class="py-3 px-5 font-light text-black rounded-md border-2 border-gray-400 focus:border-none"
	/>
	<svelte:fragment slot="footer">
		<div class="flex justify-center">
			<button
				on:click={deleteFunc}
				class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
				>{$t('Delete')}</button
			>
			<button
				class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
				>{$t('Back')}</button
			>
		</div>
	</svelte:fragment>
</Modal>
