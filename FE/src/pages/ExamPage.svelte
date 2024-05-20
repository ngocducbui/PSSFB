<script>
	import Icon from '@iconify/svelte';
	import CourseSideBar from '../components/CourseSideBar.svelte';
	import { checkExist, convertSecondsToMmSs } from '../helpers/helpers';
	import { goto } from '$app/navigation';
	import { t } from '../translations/i18n';

	export let data;
	const exam = data.exam;
	const course = data.course;
	const chapter = data.chapter;
</script>

<div class=" bg-slate-200 text-black">
	<div class="px-5 py-2 font-medium truncate">{course.name} > {chapter.name} > {exam.name}</div>
	<div class="flex bg-white text-black">
		<div class="w-1/5"><CourseSideBar {course} /></div>
		<div class="w-4/5 bg-white px-20 py-40 overflow-y-scroll max-h-screen">
			<div class="font-medium text-4xl mb-3">{exam.name}</div>
			<div class="flex items-center text-neutral-500">
				Exam <Icon icon="mdi:dot" class="text-4xl" style="color: #aeadad" />
				{convertSecondsToMmSs(exam.time)}
			</div>
			<div class="flex justify-between mt-20">
				<div class="font-light text-3xl">
					<div class="mb-3">MIN GRADE: {exam.percentageCompleted ?? 0}%</div>
					{#if checkExist(exam?.examResultUser)}
					{#if exam.examResultUser < exam?.percentageCompleted}
						<div class="text-xl text-red-500">You have failed the exam with the score of {exam.examResultUser}%</div>
						{:else if  exam.examResultUser >= exam?.percentageCompleted}
						<div class="text-xl text-lime-500">You have passed the exam with the score of {exam.examResultUser}%</div>
					{/if}
						
					{/if}
				</div>
				<button
					on:click={() => goto(`/exam/takeexam/${course.id}/${chapter.id}/${exam.id}`)}
					class="font-medium text-white text-lg bg-blue-500 px-10 py-5"
					>{#if exam?.examResultUser >= exam?.percentageCompleted}
						<span>{$t('Retake Exam')}</span>
					{:else}
						<span>{$t('Take Exam')}</span>
					{/if}</button
				>
			</div>
		</div>
	</div>
</div>
