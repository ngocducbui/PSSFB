<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import Button from '../atoms/Button.svelte';
	import { Modal } from 'flowbite-svelte';
	import {
		approveCourse,
		deleteChapter,
		deleteCodeQuestion,
		deletelesson,
		deleteModExam,
		getModCourseById,
		sendCourseToApprove
	} from '$lib/services/ModerationServices';
	import { showToast } from '../helpers/helpers';
	import { pageStatus } from '../stores/store';

	export let course: any;

	let showStatus = true;
	let firstWM = false;
	let secondWM = false;
	let deleteObject: any = undefined;

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
		goto(`/manager/coursesmanager/editcourse/editchapter/${courseId}/${id}`);
	};

	const lessonClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/coursesmanager/editcourse/editlesson/${courseId}/${lindex}`);
	};

	const codelessonClick = (l: any, index: number, lindex: number) => {
		goto(`/manager/coursesmanager/editcourse/editcodelesson/${courseId}/${lindex}`);
	};

	const examclick = (l: any, index: number, lindex: number) => {
		goto(`/manager/coursesmanager/editcourse/editexam/${courseId}/${lindex}`);
	};

	const deleteFunc = async () => {
		pageStatus.set('load');
		if (deleteObject) {
			switch (deleteObject.type) {
				case 'chapter':
					try {
						await deleteChapter(deleteObject.id);
						showToast('Deleted chapter ', 'Delete chapter success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted chapter ', 'Something went wrong', 'error');
					}
					break;
				case 'lesson':
					try {
						await deletelesson(deleteObject.id);
						showToast('Deleted lesson ', 'Delete lesson success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted lesson ', 'Something went wrong', 'error');
					}
					break;
				case 'practice question':
					try {
						await deleteCodeQuestion(deleteObject.id);
						showToast('Deleted practice question ', 'Delete practice question success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted practice question ', 'Something went wrong', 'error');
					}
					break;
				case 'exam':
					try {
						await deleteModExam(deleteObject.id);
						showToast('Deleted exam ', 'Delete exam success', 'success');
					} catch (error) {
						console.log(error);
						showToast('Deleted exam ', 'Something went wrong', 'error');
					}
					break;
			}
			course = await getModCourseById(course.id);
			pageStatus.set('done');
		}
	};
</script>

<main class="fixed top-16 md:top-24 right-0">
	<div>
		{#if showStatus}
			<div class="">
				<div
					class="w-72 h-[calc(100vh-64px)] lg:h-[calc(100vh-96px)] shadow-xl border bg-white pr-3"
				>
					<div
						class="text-xl font-medium pt-4 px-4 mb-3 flex justify-between items-center truncate"
					>
						<button
							on:click={() => (showStatus = false)}
							class="hover:bg-gray-200 p-1 cursor-pointer mr-1"
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
							on:click={() => goto(`/manager/coursesmanager/editcourse/${courseId}`)}
							><p class="overflow-hidden">{course.name}</p></button
						>
					</div>
					<hr class="" />
					<!--chapter loop-->
					<div class="mx-4">
						{#each chapters as s, index}
							<div
								class="justify-between text-md font-medium my-2 rounded-md flex items-center text-neutral-500 bg-gray-200 hover:bg-gray-300"
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
								<button on:click={() => chapterClick(s.id)} class="w-full truncate"
									><p class="font-normal text-black truncate hover:underline">{s?.name}</p></button
								>
								<button
									class="p-2 bg-gray-600 rounded-r-md"
									on:click={() => {
										deleteObject = { id: s.id, type: 'chapter' };
										firstWM = true;
									}}><Icon icon="material-symbols:delete" style="color: #ff4d4d" /></button
								>
							</div>
							<div id="schedule{index}">
								{#each s.lessons as l}
									<div
										class="ml-8 flex items-center justify-between bg-gray-200 hover:bg-green-200 group"
									>
										<div class="bg-green-300 rounded-l-lg">
											<Icon class="m-1 p-[2px] text-2xl text-gray-600 " icon="ion:book-sharp" />
										</div>

										<button
											class="truncate group-hover:underline"
											on:click={() => lessonClick(l, s.id, l.id)}>{l.title}</button
										>
										<button
											class="bg-gray-600 p-2 rounded-r-md"
											on:click={() => {
												deleteObject = { id: l.id, type: 'lesson' };
												firstWM = true;
											}}
										>
											<Icon icon="material-symbols:delete" style="color: #ff4d4d" />
										</button>
									</div>
								{/each}
								<div class="flex justify-end mt-1 mb-3">
									<button
										class=" text-blue-500 py-1 px-2 rounded-md text-md"
										on:click={() =>
											goto(`/manager/coursesmanager/addcourse/addlesson/${courseId}/${s.id}`)}
										>Add lesson</button
									>
								</div>

								{#each s.codeQuestions as l}
									<div class="ml-8 mb-5 flex items-center justify-between bg-gray-200">
										<div class="bg-green-300 rounded-l-lg">
											<Icon
												class="m-1 p-[2px] text-2xl text-gray-600"
												icon="material-symbols:code"
											/>
										</div>

										<button
											on:click={() => codelessonClick(l, s.id, l.id)}
											class="truncate px-2 hover:underline">{l.title ?? ''}</button
										>
										<button
											class="bg-gray-600 p-2 rounded-r-md"
											on:click={() => {
												deleteObject = { id: l.id, type: 'practice question' };
												firstWM = true;
											}}><Icon icon="material-symbols:delete" style="color: #ff4d4d" /></button
										>
									</div>
								{/each}

								<div class="flex justify-end my-5">
									<button
										class="text-blue-500"
										on:click={() =>
											goto(`/manager/coursesmanager/addcourse/addcodelesson/${courseId}/${s.id}`)}
										>Add Practice Question</button
									>
								</div>

								{#each s.lastExam as l}
									<div class="ml-8 mb-5 flex items-center justify-between bg-gray-200">
										<div class="bg-green-300 rounded-l-lg">
											<Icon
												class="m-1 p-[2px] text-2xl text-gray-600"
												icon="healthicons:i-exam-multiple-choice-outline"
											/>
										</div>

										<button
											on:click={() => examclick(l, s.id, l.id)}
											class="truncate px-2 hover:underline">{l.name}</button
										>
										<button
											class="bg-gray-600 p-2 rounded-r-md"
											on:click={() => {
												deleteObject = { id: l.id, type: 'exam' };
												firstWM = true;
											}}><Icon icon="material-symbols:delete" style="color: #ff4d4d" /></button
										>
									</div>
								{/each}
								<div class="flex justify-end my-5">
									<button
										class="text-blue-500"
										on:click={() =>
											goto(`/manager/coursesmanager/addcourse/addexam/${courseId}/${s.id}`)}
										>Add Exam</button
									>
								</div>
							</div>
						{/each}
					</div>
					<div class="flex justify-end my-5">
						<button
							class="text-blue-500"
							on:click={() => goto(`/manager/coursesmanager/addcourse/addchapter/${courseId}`)}
							>Add Chapter</button
						>
					</div>
					<div class="flex justify-end my-5">
						<button
							class="text-blue-500"
							on:click={async () => {
								sendCourseToApprove(courseId);
								showToast('Waiting for approved', 'Waiting for approved', 'info');
							}}>Send to approved</button
						>
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

		<!--modal-->
		<Modal on:close={() => (firstWM = false)} title="Warning" bind:open={firstWM} autoclose>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Do you sure you want to delete this.
			</p>
			<svelte:fragment slot="footer">
				<div class="flex justify-center">
					<button
						on:click={() => (secondWM = true)}
						class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
						>Yes</button
					>
					<button
						class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
						>No</button
					>
				</div>
			</svelte:fragment>
		</Modal>

		<Modal on:close={() => (secondWM = false)} title="Warning" bind:open={secondWM} autoclose>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Confirm again to delete
			</p>
			<svelte:fragment slot="footer">
				<div class="flex justify-center">
					<button
						on:click={deleteFunc}
						class=" bg-red-500 rounded-md p-3 font-medium text-white items-center inline-flex border-2"
						>Yes</button
					>
					<button
						class=" bg-white rounded-md p-3 font-medium text-black items-center inline-flex border-2"
						>No</button
					>
				</div>
			</svelte:fragment>
		</Modal>
	</div>
</main>
