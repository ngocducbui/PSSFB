<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { t } from '../translations/i18n';
	import { page } from '$app/stores';

	export let course: any;

	$: courseId = course?.id;
	$: chapters = course?.chapters ?? [];

	const ids = $page.params?.ids?.split('/');
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

	const lessonClick = (l: any, index: number, lindex: number) => {
		goto(`/lesson/${courseId}/${index}/${lindex}`);
	};

	const codelessonClick = (l: any, index: number, lindex: number) => {
		goto(`/codelesson/${courseId}/${index}/${lindex}`);
	};

	const examclick = (l: any, index: number, lindex: number) => {
		goto(`/exam/${courseId}/${index}/${lindex}`);
	};
</script>

<div class="w-full h-full shadow-xl rounded-2xl mr-10 border overflow-y-scroll bg-white">
	<div class="text-2xl font-medium px-3 py-5">{$t('Schedule')}</div>

	<hr class="my-5" />

	{#each chapters as s, index}
		<div
			class="text-lg font-medium px-3 py-5 border-b flex items-center {s?.isCompleted
				? 'bg-lime-200 justify-between'
				: ''} text-neutral-500"
		>
			<div class="flex items-center">
				<div
					class="mr-5"
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
				{s?.name}
			</div>
			{#if s?.isCompleted}
				<Icon icon="el:ok" style="color: #06c403" />
			{/if}
		</div>
		<div id="schedule{index}">
			{#each s?.lessons ?? [] as l}
				<a
					href="/lesson/{courseId}/{s.id}/{l.id}"
					target="_blank"
					class="px-10 py-2 flex items-center border-b {l?.isCompleted
						? 'justify-between'
						: ''} {$page.url.pathname.includes('lesson') && ids[2] == l.id ? 'bg-blue-100' : ''}"
				>
					<div class="w-4/5 truncate">
						<div class="flex items-center flex-wrap">
							<Icon class="mr-3" icon="ion:book-sharp" style="color: gray" />

							{l.title}
						</div>

						<div class="truncate pl-7 pr-5 text-sm text-neutral-500">
							{l.description}
						</div>
					</div>

					{#if l?.isCompleted}
						<Icon icon="el:ok" style="color: #06c403" />
					{/if}
				</a>
			{/each}

			{#each s?.codeQuestions ?? [] as l}
				<a
					href="/codelesson/{courseId}/{s.id}/{l.id}"
					target="_blank"
					class="px-10 py-2 flex items-center flex-wrap border-b {l?.isCompleted
						? 'justify-between'
						: ''} {$page.url.pathname.includes('codelesson') && ids[2] == l.id
						? 'bg-blue-100'
						: ''}"
				>
					<div class="w-4/5 truncate">
						<div class="flex items-center flex-wrap">
							<div>
								<Icon class="mr-3 text-xl" icon="material-symbols:code" style="color: gray" />
							</div>

							<div class="truncate w-4/5">{l.title ?? ''}</div>
						</div>
					</div>

					{#if l?.isCompleted}
						<Icon icon="el:ok" style="color: #06c403" />
					{/if}
				</a>
			{/each}

			{#each s.lastExam as l}
				<a
					href="/exam/{courseId}/{s.id}/{l.id}"
					target="_blank"
					class="px-10 py-2 flex items-center border-b {l?.isCompleted
						? 'justify-between'
						: ''} {$page.url.pathname.includes('exam') && ids[2] == l.id ? 'bg-blue-100' : ''}"
				>
					<div class="w-4/5 truncate">
						<div class="flex items-center flex-wrap">
							<div>
								<Icon
									class="mr-3 text-xl"
									icon="healthicons:i-exam-multiple-choice-outline"
									style="color: gray"
								/>
							</div>

							{l.name}
						</div>
					</div>

					{#if l?.isCompleted}
						<Icon icon="el:ok" style="color: #06c403" />
					{/if}
				</a>
			{/each}
		</div>
	{/each}
</div>
