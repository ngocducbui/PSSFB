<script lang="ts">
	import Icon from '@iconify/svelte';
	import { secondsToHMS, showToast } from '../helpers/helpers';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser } from '../stores/store';
	import Status from '../atoms/Status.svelte';
	import { t } from '../translations/i18n';
	import { formatDateTime } from '../helpers/datetime';
	import { addWishList } from '$lib/services/CourseServices';
	import { page } from '$app/stores';
	export let course: any;
	export let type = 'public';
	export let AddToWishList: any = (event: any, courseId: number) => {
		addWishList($currentUser?.UserID, course.id);
		showToast('Add to wish list', 'Add to wish list successfully', 'success');
		event?.target?.classList?.remove('text-slate-400');
		event?.target?.classList?.add('text-red-300');
	};
	export let RemoveFromWishList: any = () => {};
</script>

<div class="relative h-[450px]">
	<div
		class="absolute top-0 left-0 w-[90%] border rounded shadow-xl hover:-translate-y-5 transition group bg-white"
	>
		{#if type == 'public'}
			<div class="overflow-hidden w-full h-[200px] shadow-md flex justify-center items-center">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					alt="Course Image"
					src={course.picture}
					class="w-full h-full text-center object-cover"
				/>
			</div>
			<!--Course Information-->
			<div class="p-4 transition delay-50 duration-300 ease-in-out">
				{#if $currentUser?.Role == 'Student'}
					<button
						on:click={() => goto(`/learning/${course.courseId}`)}
						class="font-medium text-xl mb-2 group-hover:underline line-clamp-1"
						><p class="line-clamp-1">{course.name}</p></button
					>
					<p class="text-sm"><span class="font-semibold">Create By:</span> {course.userName}</p>
				{:else if $currentUser?.Role == 'AdminBussiness'}
					<button class="font-medium text-xl mb-2 group-hover:underline line-clamp-1"
						><p class="line-clamp-1">{course.name}</p></button
					>
				{/if}
				<p class="text-sm flex items-center justify-between">
					<span><span class="font-semibold">{$t('Language')}</span>: {course.tag}</span>
					{#if $currentUser?.Role == 'Student'}
						{#if course?.isInWishList == false}
							<button
								on:click={(event) => AddToWishList(event, course.id)}
								class="hover:text-red-300 text-slate-400 text-2xl pr-3"
								><Icon icon="material-symbols:favorite" /></button
							>
						{:else if course?.isInWishList == true}
							<button class="text-red-300 text-2xl pr-3"
								><Icon icon="material-symbols:favorite" /></button
							>
						{/if}
					{/if}
				</p>
				<p class="text-sm line-clamp-1 group-hover:line-clamp-3">
					<span class="font-semibold">Description</span>: {course.description}
				</p>
			</div>
			<hr />
			<div class="px-2 py-5 flex justify-between items-center">
				<div class="flex items-center text-sm"></div>

				{#if $currentUser?.Role == 'Student'}
					<Button onclick={() => goto(`/learning/${course.courseId}`)} content={$t('join now')} />
				{/if}
			</div>
			{#if $page.url.pathname.includes('wishlist') && $currentUser?.Role == 'Student'}
				<div class="flex justify-end">
					<button
						on:click={() => RemoveFromWishList(course.id)}
						class="text-red-500 text-xs py-3 px-3">Remove from wishlist</button
					>
				</div>
			{/if}
		{/if}
	</div>
</div>
