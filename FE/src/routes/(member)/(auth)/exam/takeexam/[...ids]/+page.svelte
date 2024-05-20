<script lang="ts">
	import {
		convertSecondsToMmSs,
		secondsToDateTime,
		showToast,
		formatLongToDate
	} from '../../../../../../helpers/helpers';
	import { goto } from '$app/navigation';
	import { currentUser, pageStatus } from '../../../../../../stores/store';
	import Button from '../../../../../../atoms/Button.svelte';
	import { submitExam } from '$lib/services/CourseServices';
	import ExamAnswers from '../../../../../../atoms/ExamAnswers.svelte';
	import { initMessage } from '$lib/type';
	import { t } from '../../../../../../translations/i18n';
	import { page } from '$app/stores';

	export let data;
	const exam = data.exam;
	const questionExams = exam.questionExams;
	const chapterId = data.chapterId;
	const courseId = data.courseId;
	let timeleft = exam.time;
	let time = exam.time;
	let submitData = {
		lastExamId: exam.id,
		userId: $currentUser?.UserID,
		questionExam: questionExams.map((qe: any) => {
			return { id: qe.id, selectedAnswerIds: [] };
		})
	};

	let intervalID = setInterval(() => {
		if (!$page.url.pathname.includes('takeexam')) {
			clearInterval(intervalID);
		}

		if (timeleft == 0) {
			SubmitExam();
		}

		timeleft = timeleft - 1;
	}, 1000);

	const SubmitExam = async () => {
		pageStatus.set('load');
		console.log(JSON.stringify(submitData));
		clearInterval(intervalID);
		try {
			const result: any = await submitExam(submitData);
			if (result?.msgTextEN) {
				showToast(result.msgCode, result.msgTextEN);
			}
		} catch (error) {
			console.error(error);
		}
		goto(`/exam/${courseId}/${chapterId}/${exam.id}`);
		pageStatus.set('done');
	};

	window.onpopstate = function (event) {
		var result = window.confirm('Thoát trang kiểm tra?');
		if (result) {
		} else {
			event.preventDefault();
		}
	};
</script>

<div class="px-40 py-20">
	<div class="p-20 border rounded-xl bg-white">
		<div class="text-center font-bold text-4xl text-blue-500">{convertSecondsToMmSs(timeleft)}</div>
		<div class="text-3xl font-bold">{exam.name}</div>
		<hr class="my-5" />
		<div class="mb-5">
			The due date for this exam is <span class="font-bold text-blue-500"
				>{formatLongToDate(Date.now() + time * 1000)}</span
			>
		</div>
		{#each questionExams as qe, index}
			<div class="border mb-3 rounded py-10 px-5">
				<div class="text-xl font-extrabold mb-5">Question {index + 1}</div>
				<div class="mb-3">{qe.contentQuestion}</div>
				<ExamAnswers bind:submitData questionExam={qe} />
			</div>
		{/each}
		<div class="flex justify-end"><Button onclick={SubmitExam} content={$t('Submit')} /></div>
	</div>
</div>
