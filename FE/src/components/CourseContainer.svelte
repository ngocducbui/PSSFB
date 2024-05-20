<script lang="ts">
	import Icon from '@iconify/svelte';
	import { secondsToHMS, showToast } from '../helpers/helpers';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser } from '../stores/store';
	import Status from '../atoms/Status.svelte';
	import { t } from '../translations/i18n';
	import { formatDateTime } from '../helpers/datetime';
	import { addWishList, getUserEvaluation } from '$lib/services/CourseServices';
	import { page } from '$app/stores';
	import RatingStar from '../atoms/RatingStar.svelte';
	import { onMount } from 'svelte';
	import PopUpConfirm from './modals/PopUpConfirm.svelte';

	export let course: any;
	export let type = 'public';
	export let ApproveCourse: any = () => {};
	export let RejectCourse: any = () => {};
	export let DeleteCourse: any = () => {};

	export let RemoveFromWishList: any = () => {};

	let popUpConfirmInstance: any;
</script>

<div class="relative h-[450px]">
	<div
		class="absolute top-0 left-0 w-[95%] border rounded shadow-xl hover:-translate-y-5 transition group bg-white"
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
			<div class="overflow-hidden p-4 transition delay-50 duration-300 ease-in-out">
				<div class="flex justify-between items-center">
					{#if $currentUser?.Role == 'AdminBussiness'}
						<button class="w-full text-left font-medium text-xl mb-2 group-hover:underline truncate"
							>{course.name}</button
						>
					{:else}
						<div class="flex-col w-full">
							<div class="float-start">
								<RatingStar size={18} rating={course?.averageEvaluate?.toFixed()} />
							</div>
							<button
								on:click={() => goto(`/learning/${course.id}`)}
								class="w-full text-left font-medium text-xl mb-2 group-hover:underline truncate"
								>{course.name}</button
							>
						</div>
					{/if}
				</div>
				{#if $currentUser?.Role == 'AdminBussiness'}
					<p class="text-sm truncate">
						<span class="font-semibold">Create By:</span>
						{$currentUser?.displayName}
					</p>
				{:else}
					<p class="text-sm truncate">
						<span class="font-semibold">Create By:</span>
						{course.userName}
					</p>
				{/if}
				<p class="text-sm flex items-center justify-between">
					<span><span class="font-semibold">{$t('Language')}</span>: {course.tag}</span>
				</p>
				<p class="text-sm line-clamp-1 group-hover:line-clamp-3">
					<span class="font-semibold">Description</span>: {course.description}
				</p>
			</div>
			<hr />
			<div class="px-2 py-5 flex justify-between items-center">
				<div class="flex items-center text-sm"></div>

				{#if $currentUser?.Role == 'AdminSystem'}
					<div>
						{#if course?.status != 'Accepted'}
							<Button
								classes="text-green-500"
								onclick={() => ApproveCourse(course?.courseId)}
								content={$t('Approve')}
							/>
						{/if}

						{#if course?.status != 'Rejected'}
							<Button
								classes="text-red-500"
								onclick={() => RejectCourse(course?.id)}
								content={$t('Reject')}
							/>
						{/if}
						<Button
							onclick={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)}
							content={$t('Detail')}
						/>
					</div>
				{:else if $currentUser?.Role == 'AdminBussiness'}
					<div>
						<Button
							onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
							content={$t('Edit')}
						/>
						<Button
							type="danger"
							onclick={async () => {
								if (!popUpConfirmInstance) {
									popUpConfirmInstance = new PopUpConfirm({
										target: document.body,
										props: {
											content: 'Do you want to delete this course?'
										}
									});
								}
								const confirmed = await popUpConfirmInstance.show();
								if (!confirmed) {
									return;
								}
								DeleteCourse(course.id);
							}}
							content={$t('Delete')}
						/>
					</div>
				{:else}
					<Button onclick={() => goto(`/learning/${course.id}`)} content={$t('Join now')} />
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
		{:else if type == 'admin'}
			<button
				on:click={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)}
				class="overflow-hidden w-full h-[200px] shadow-md flex justify-center items-center"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					alt="Course Image"
					src={course.coursePicture}
					class="w-full h-full text-center object-cover"
				/>
			</button>

			<div class="p-4">
				<h3 class="font-medium truncate text-xl mb-2">{course.courseName}</h3>

				<p class="text-sm text-neutral-500 mb-3">Create By: {course.userName}</p>
				<p class="truncate text-sm">{course.courseDescription}</p>
				<p>
					{#if course?.status}
						<Status status={course?.status} />
					{/if}
				</p>
			</div>
			<hr />
			<div class="px-2 py-5 flex justify-between items-center">
				<div class="flex items-center text-sm">{formatDateTime(course.createdAt)}</div>

				{#if $currentUser?.Role == 'AdminSystem'}
					<div>
						{#if course?.status != 'Accepted'}
							<Button
								type="Accepted"
								onclick={() => ApproveCourse(course?.courseId)}
								content={$t('Approve')}
							/>
						{/if}

						{#if course?.status != 'Rejected'}
							<Button
								type="Rejected"
								classes="text-red-500"
								onclick={() => RejectCourse(course?.id)}
								content={$t('Reject')}
							/>
						{/if}
						<!-- <Button
						onclick={() => goto(`/manager/moderationcourses/detail/${course?.courseId}`)}
						content="Detail"
					/> -->
					</div>
				{:else if $currentUser?.Role == 'AdminBussiness'}
					<div>
						<Button
							onclick={() => goto(`/manager/coursesmanager/editcourse/${course.id}`)}
							content={$t('Edit')}
						/>
						<Button
							type="danger"
							onclick={async () => {
								if (!popUpConfirmInstance) {
									popUpConfirmInstance = new PopUpConfirm({
										target: document.body,
										props: {
											content: 'Do you want to delete this course?'
										}
									});
								}
								const confirmed = await popUpConfirmInstance.show();
								if (!confirmed) {
									return;
								}
								DeleteCourse(course.id);
							}}
							content={$t('Delete')}
						/>
					</div>
				{:else}
					<Button onclick={() => goto(`/learning/${course.id}`)} content={$t('join now')} />
				{/if}
			</div>
		{/if}
	</div>
</div>
