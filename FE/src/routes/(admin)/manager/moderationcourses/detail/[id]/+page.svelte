<script lang="ts">
	import { Textarea, Select, Label } from 'flowbite-svelte';

	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';

	
	import { showToast } from '../../../../../../helpers/helpers';
	import Input from '../../../../../../atoms/Input.svelte';
	import Button from '../../../../../../atoms/Button.svelte';
	import { language } from '../../../../../../data/data';
	import AdminCourseSb from '../../../../../../components/AdminCourseSB.svelte';
	import AdminSystemSb from '../../../../../../components/AdminSystemSB.svelte';
	import { t } from '../../../../../../translations/i18n';
	import Icon from '@iconify/svelte';

	export let data;
	let course: any = data?.course;
	const quiz = course?.chapters.flatMap((chapter: any) => chapter.lessons);
	const code = course?.chapters.flatMap((chapter: any) => chapter.codeQuestions);
	const exam = course?.chapters.flatMap((chapter: any) => chapter.lastExam);
	
</script>

<div class="flex">
	<div class="w-4/5">
		<div class="bg-neutral-100 border px-40 pb-20">
			<div class="text-center text-3xl my-10">
				{$t('Syllabus - What you will learn from this learn')}
			</div>
			<div class="text-2xl mb-5">{course.name}</div>
			<div class="flex items-center text-xl">
				<Icon class="mr-3" icon="ph:book-open-fill" style="color: #008ee6" />
				{quiz.length}
				{$t('Quizzes')}, {code.length}
				{$t('Codes')}, {exam.length}
				{$t('Exams')}
			</div>
			<hr class="my-5" />
			<div class="flex items-center font-medium">
				<Icon class="mr-3" icon="majesticons:list-box" style="color: #008ee6" />
				{$t('Quizzes')}
			</div>

			<div>
				<ul>
					{#each quiz as q}
						<li class="pl-5 my-3 flex items-center">
							<Icon class="mr-1 text-3xl" icon="mdi:dot" style="color: black" />
							{q.title}
						</li>
					{/each}
				</ul>
			</div>

			<hr class="my-5" />
			<div class="flex items-center font-medium">
				<Icon class="mr-3" icon="material-symbols:code" style="color: #008ee6" />
				{$t('Codes')}
			</div>

			<div>
				<ul>
					{#each code as q}
						<li class="pl-5 my-3 flex items-center">
							<Icon class="mr-1 text-3xl" icon="mdi:dot" style="color: black" />
							{q.title}
						</li>
					{/each}
				</ul>
			</div>

			<hr class="my-5" />
			<div class="flex items-center font-medium">
				<Icon
					class="mr-3"
					icon="healthicons:i-exam-multiple-choice-outline"
					style="color: #008ee6"
				/>
				{$t('Exams')}
			</div>

			<div>
				<ul>
					{#each exam as q}
						<li class="pl-5 my-3 flex items-center">
							<Icon class="mr-1 text-3xl" icon="mdi:dot" style="color: black" />
							{q.name}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<div class="w-1/5 ml-10">
		<AdminSystemSb bind:course />
	</div>
</div>
