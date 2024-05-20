<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import Button from '../atoms/Button.svelte';
	import { Modal } from 'flowbite-svelte';
	import {
		approveCourse,
		getModCourseById,
		sendCourseToApprove
	} from '$lib/services/ModerationServices';
	import { showToast } from '../helpers/helpers';
	import { pageStatus } from '../stores/store';

	export let course: any;

	let showStatus = false;

	const courseId = course?.id;
	$: chapters = course?.chapters ?? [];

	const plus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z' /> </svg>";

	const minus =
		"<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...$$props}> <path fill='black' d='M19 12.998H5v-2h14z' /> </svg>";
	const hidden2 = (index: number) => {
		const div = document.getElementById(`si${index}`);
		const schedule = document.getElementById(`schedule${index}`);
		if (schedule) {
			if (schedule.classList.contains('hidden')) {
				schedule.classList.remove('hidden');
				div!.innerHTML = minus;
			} else {
				schedule.classList.add('hidden');
				div!.innerHTML = plus;
			}
		}
	};

	const chapterClick = (id: number) => {
		goto(`/manager/moderationcourses/detail/chapter/${courseId}/${id}`);
	};

	const lessonClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/moderationcourses/detail/lesson/${courseId}/${lindex}`);
	};

	const codelessonClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/moderationcourses/detail/codelesson/${courseId}/${lindex}`);
	};

	const examclick = (l: any, index: number, lindex: number) => {
		goto(`/manager/moderationcourses/detail/exam/${courseId}/${lindex}`);
	};
</script>

<main class="fixed top-16 md:top-24 right-0">
	{#if showStatus}
		<div class="">
			<div class="w-72 h-[calc(100vh-64px)] lg:h-[calc(100vh-96px)] shadow-xl border bg-white pr-3">
				<div class="text-2xl font-medium pt-4 px-4 mb-3 flex justify-between items-center">
					<button
						on:click={() => (showStatus = false)}
						class="hover:bg-gray-200 p-1 cursor-pointer mr-3"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							{...$$props}
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 8h9m-9 4h16m0 0l-3-3m3 3l-3 3M4 16h9"
							/>
						</svg>
					</button>
					<button
						class="hover:underline"
						on:click={() => goto(`/manager/moderationcourses/detail/${courseId}`)}
						><p class="overflow-hidden">{course.name}</p></button
					>
				</div>
				<hr class="" />
				<!--chapter loop-->
				<div class="mx-4">
					{#each chapters as s, index}
						<div
							class="text-lg font-medium my-2 rounded-md flex items-center text-neutral-500 bg-gray-200 hover:bg-gray-300"
						>
							<div
								class="mr-2 bg-blue-500 p-2 rounded-l-md"
								tabindex="0"
								role="button"
								on:keydown={() => {
									() => hidden2(index);
								}}
								on:click={() => hidden2(index)}
								id="si{index}"
							>
								{@html minus}
							</div>
							<button class="w-full truncate"
								><p class="font-normal text-black truncate">{s?.name}</p></button
							>
						</div>
						<div id="schedule{index}">
							{#each s.lessons as l}
								<div class="pl-10 mb-5 flex items-center">
									<div>
										<Icon class="mr-3 text-2xl" icon="ion:book-sharp" style="color: gray" />
									</div>

									<button class="truncate pr-10" on:click={() => lessonClick(l, s.id, l.id)}
										>{l.title}</button
									>
								</div>
							{/each}

							{#each s.codeQuestions as l}
								<div class="pl-10 mb-5 flex items-center">
									<div>
										<Icon class="mr-3 text-2xl" icon="material-symbols:code" style="color: gray" />
									</div>

									<button on:click={() => codelessonClick(l, s.id, l.id)} class="truncate pr-10"
										>{l.title ?? ''}</button
									>
								</div>
							{/each}

							{#each s.lastExam as l}
								<div class="pl-10 mb-5 flex items-center">
									<div>
										<Icon
											class="mr-3 text-2xl"
											icon="healthicons:i-exam-multiple-choice-outline"
											style="color: gray"
										/>
									</div>

									<button on:click={() => examclick(l, s.id, l.id)} class="truncate pr-10"
										>{l.name}</button
									>
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<button
			on:click={() => (showStatus = true)}
			class="hover:bg-gray-200 p-1 cursor-pointer mr-6 mt-3 border-2 border-gray-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				viewBox="0 0 24 24"
				{...$$props}
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20 8h-9m9 4H4m0 0l3-3m-3 3l3 3m13 1h-9"
				/>
			</svg>
		</button>
	{/if}
</main>
