<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { currentUser, pageStatus } from '../stores/store';
	import { getNotificationByUserId } from '$lib/services/NotificationService';
	import Avatar from '../atoms/Avatar.svelte';
	import { formatDateTime, getTimeDifference } from '../helpers/datetime';
	import { goto } from '$app/navigation';

	let notificationShow = false;
	let data: any;

	onMount(async () => {
		let result = await getNotificationByUserId($currentUser.UserID);
		data = result.items;
	});

	const clickHandle = () => {
		notificationShow = !notificationShow;
	};

	const notificationNavidation = (item: any) => {
		if (item.courseId === null) {
			goto(`/mypendingposts/${item.postId}`);
		} else {
			goto(`/learning/${item.courseId}`);
		}
		notificationShow = false;
	};
</script>

<main class="relative">
	<button on:click={() => (notificationShow = !notificationShow)}>
		<div class="max-h-3/4 p-1 text-gray-600">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path
					fill="currentColor"
					d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
				/>
			</svg>
		</div>
		<div
			class=" absolute {notificationShow
				? 'flex'
				: 'hidden'} mt-2 py-2 right-0 w-[400px] bg-gray-100 shadow-xl rounded-lg flex flex-col max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-96px)]"
		>
			<div class="px-5 underline py-3 w-full"><p class="">Notification</p></div>
			{#if data?.length > 0}
				<div class="flex flex-col justify-start w-full">
					{#each data as item}
						<button
							on:click={() => notificationNavidation(item)}
							class="px-5 py-2 my-1 flex items-center w-full {item.isSeen == false
								? 'bg-blue-200 hover:bg-green-200'
								: 'bg-gray-100 hover:bg-blue-100'}"
						>
							<div class="mx-2 w-10 h-10">
								<Avatar
									classes="w-full h-full rounded-full border-2 border-blue-300"
									src="/src/assets/Xanh final.png"
								/>
							</div>
							<div class="flex flex-col flex-1">
								<p class="line-clamp-1 float-start text-start">{item.notificationContent}</p>
								<p class="ml-2 float-start text-start text-xs font-light">
									{getTimeDifference(item.sendDate)}
								</p>
							</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="flex justify-center items-center py-2 bg-red-100">
					<p class="">No message</p>
				</div>
			{/if}
		</div>
	</button>
</main>
