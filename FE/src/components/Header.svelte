<script lang="ts">
	import { headerAdminData, headerData } from '../data/data';
	import logoWhite from '../assets/Xanh final.png';
	import LoginBtn from '../atoms/LoginBtn.svelte';
	import RegisterBtn from '../atoms/RegisterBtn.svelte';
	import { page } from '$app/stores';
	import { locale, t } from '../translations/i18n';
	import { currentUser } from '../stores/store';
	import LogoutBtn from '../atoms/LogoutBtn.svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import { goto } from '$app/navigation';
	import DropBar from './DropBar.svelte';
	import Icon from '@iconify/svelte';
	import Notification from './Notification.svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { getUserInfo } from '$lib/services/AuthenticationServices';

	let topbarStatus = false;
	// let userInfo: any;

	const changelang = (e: any) => locale.update(() => e.target.value);

	// afterUpdate(async () => {
	// 	if (!userInfo && $currentUser?.UserId) {
	// 		userInfo = await getUserInfo($currentUser?.UserID);
	// 	}
	// });

	// $: if ($currentUser) {
	// 	if ($currentUser?.UserID) {
	// 		getUserInfo($currentUser?.UserID).then((result) => (userInfo = result));
	// 	}
	// }
</script>

<main>
	<div
		class=" fixed flex w-full bg-white text-black items-center font-medium border-b-2 z-10 justify-between lg:h-24 h-16"
	>
		<div class="flex items-center justify-center">
			<a href="/" class="lg:w-28 w-16"
				><img alt="logo" class="overflow-hidden" width="" src={logoWhite} /></a
			>
		</div>
		<div class="md:ml-20 md:flex hidden font-medium text-xl items-center">
			{#if $currentUser?.Role?.includes('Admin')}
				{#each headerAdminData as header}
					<a
						href={header.link}
						class="text-sm lg:text-xl mx-4 lg:lg-7 hover:text-green-500 {$page.url.pathname.includes(
							header.link
						)
							? 'text-blue-500'
							: ''}">{$t(header.display)}</a
					>
				{/each}
			{:else}
				{#each headerData as header}
					<a
						href={header.link}
						class=" text-sm lg:text-md xl:text-xl mx-3 lg:mx-4 xl:mx-5 hover:text-green-500 {$page.url.pathname.includes(
							header.link
						)
							? 'text-blue-500'
							: ''}">{$t(header.display)}</a
					>
				{/each}
				{#if $currentUser}
					<a
						href="/wishlist"
						class="flex items-center text-sm lg:text-md xl:text-xl mx-3 lg:mx-4 xl:mx-5 hover:text-green-500 {$page.url.pathname.includes(
							'wishlist'
						)
							? 'text-blue-500'
							: ''}"
						>{$t('WishList')}
						<span class="text-xl ml-1"
							><Icon icon="pepicons-pop:bookmark-filled-circle-filled" /></span
						></a
					>
				{/if}
			{/if}
		</div>
		<!--Top bar button-->
		<button
			on:click={() => (topbarStatus = !topbarStatus)}
			class="md:hidden hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="2em"
				height="2em"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
			</svg>
		</button>
		<div class=" flex items-center justify-end mr-5 lg:mr-20">
			<select on:change={changelang} class="border-2 mr-5 hidden lg:flex">
				<option>vn</option>
				<option>en</option>
			</select>
			<div class="flex items-center">
				{#if !$currentUser}
					<LoginBtn onClick={() => goto('/')} />
					<RegisterBtn onClick={() => goto('/register')} />
				{:else}
					<a
						href="/profile"
						class="flex justify-center items-center mr-2 border-2 border-blue-200 hover:bg-green-200 lg:pr-1 rounded-full max-w-[200px]"
					>
						<Avatar
							classes="w-8 h-8 lg:h-10 lg:w-10 rounded-full lg:mr-2 "
							src={$currentUser?.photoURL}
						/>
						<p class="lg:mr-3 hidden lg:block truncate">{$currentUser.displayName}</p>
					</a>
					<div class="mr-1 md:mr-5"><Notification /></div>
					<LogoutBtn />
				{/if}
			</div>
		</div>
	</div>
	<!--top div bar-->
	<div class="h-16 lg:h-24"></div>
	<!--Drop bar-->
	<div class={topbarStatus ? '' : 'hidden'}>
		<DropBar />
	</div>
</main>
