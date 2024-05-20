<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '../atoms/Avatar.svelte';
	import Button2 from '../atoms/Button2.svelte';
	import { goto } from '$app/navigation';
	import Logo from '../assets/Trắng final.png';
	import CommentContainer from '../components/CommentContainer.svelte';
	import { getCommentByCourse } from '$lib/services/CommentService';
	import Momo from '../assets/Momo.jpg';
	import VNPay from '../assets/VNPay.png';
	import SkillsSet from '../components/SkillsSet.svelte';
	import {
		addWishList,
		createUserEvaluation,
		enroll,
		getCourseAverageEvaluation,
		getCourseById,
		getProgressCourses,
		getUserEvaluation
	} from '$lib/services/CourseServices';
	import { currentUser, pageStatus } from '../stores/store';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { t } from '../translations/i18n';
	import { checkExist, convertToVND, showToast } from '../helpers/helpers';
	import { createPayment } from '$lib/services/PaymentService';
	import PercentCircle from '../components/PercentCircle.svelte';
	import axios from 'axios';
	import { Modal } from 'flowbite-svelte';
	import RatingStar from '../atoms/RatingStar.svelte';

	export let data: any;
	let course: any = data.course;
	let comments = data.comments;
	let evaluationState = true;
	let paymentModal = false;
	//let enrolled = false;
	//let enrolled = false;
	let rating: any = 0;
	let averageRate: any = 0;
	const fullStar =
		'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z';
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	const emptyStar =
		'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z';

	const sysllabus = data.sysllabus;
	const quiz = course?.chapters.flatMap((chapter: any) => chapter.lessons);
	const code = course?.chapters.flatMap((chapter: any) => chapter.codeQuestions);
	const exam = course?.chapters.flatMap((chapter: any) => chapter.lastExam);
	let section = 'Introduction';
	let sections: any;
	let enrollNumber: number;

	let completionPercentage = 0;
	let isDone: boolean;

	sections = ['Introduction', 'Sysllabus', 'Comments', 'Evaluation'];

	onMount(async () => {
		getProgressCourses($currentUser.UserID).then((result: any) => {
			let pcourse = result?.enrolledCourses?.find((c: any) => c.id == course.id);
			if (pcourse?.completionPercentage) {
				completionPercentage = Math.round(pcourse.completionPercentage);
				isDone = pcourse.isDone;
			}
		});
		const response = await getUserEvaluation($currentUser.UserID, course.id);
		if (response.value) {
			rating = response.value;
			if (rating && rating > 0) {
				evaluationState = false;
			}
		}
		let result = await axios.get(
			`https://coursesservices.azurewebsites.net/api/Enrollment/GetQuantityOfUserEnrollCourse?courseId=${course.id}`
		);
		enrollNumber = result.data;

		let courseAverate = await getCourseAverageEvaluation(course.id);
		averageRate = courseAverate.value;
	});

	const evaludatioHandle = async () => {
		if (rating == 0) {
			showToast('Evaluation Error', 'Missing evaluation', 'error');
		} else if (completionPercentage < 100 || isDone == false) {
			showToast('Evaluation', 'You need to complete course first', 'error');
		} else if (evaluationState == false) {
			showToast('Evaluation', 'You are already take feedback', 'error');
		} else {
			const response = await createUserEvaluation($currentUser.UserID, course.id, rating);
			showToast('Evaluation', 'Add evaluation success', 'success');
			evaluationState = false;
		}
	};

	const AddToWishList = (event: any) => {
		addWishList($currentUser?.UserID, course.id);
		showToast('Add to wish list', 'Add to wish list successfully', 'success');
		event?.target?.classList?.remove('text-slate-400');
		event?.target?.classList?.add('text-yellow-100');
	};

	const payment = async (typePayment: string) => {
		paymentModal = false;
		pageStatus.set('load');
		try {
			const result = await createPayment({
				paymentContent: `${course.name}`,
				requiredAmount: course?.price ?? 0,
				userCreateCourseId: course.createdBy,
				courseId: course.id,
				userBuyId: $currentUser?.UserID,
				typePayment
			});
			if (result?.paymentUrl) {
				console.log(result);
				var url = result?.paymentUrl;
				var windowName = '_blank'; // Name of the window, '_blank' opens in a new tab
				var windowWidth = 600; // Width of the window
				var windowHeight = 400; // Height of the window

				// Calculate the position to center the window
				var windowLeft = (window.screen.width - windowWidth) / 2;
				var windowTop = (window.screen.height - windowHeight) / 2;

				// Features of the new window
				var windowFeatures =
					'width=' +
					windowWidth +
					',height=' +
					windowHeight +
					',toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=' +
					windowLeft +
					',top=' +
					windowTop;

				// Open a new window with the specified URL and features
				var popup: any = window.open(url, windowName, windowFeatures);
				console.log('popup: ' + popup);

				var timer = setInterval(function () {
					if (popup.closed) {
						clearInterval(timer);
						console.log('clear timer');
						getCourseById(course.id, $currentUser.UserID).then((course2) => {
							course = course2;
						});
					}
				}, 1000);
			}
		} catch (error) {
			console.log(error);
		}
		pageStatus.set('done');
	};
</script>

<div>
	<div class="flex pt-10 px-40 bg-blue-950 text-white h-[500px]">
		<div class="w-2/3">
			<div class="text-6xl my-5">{course?.name}</div>
			<div class="flex text-4xl my-5">
				<RatingStar size={24} rating={averageRate} />
			</div>
			<div class="flex items-center">
				<Avatar src={course?.avatar} classes="w-10 h-10 rounded-full mr-3" />
				<div class="text-xl">{course?.created_Name}</div>
			</div>
			<div class="flex items-center">
				{#if checkExist($currentUser)}
					{#if course?.isEnrolled == true}
						<Button2
							onclick={async () => {
								goto(`/overall/${course.id}`);
							}}
							classes="py-3 px-16 bg-white text-black my-10"
							content={$t('Go to course')}
						/>
					{:else if course?.isEnrolled == false}
						{#if course?.price > 0}
							<Button2
								onclick={() => (paymentModal = true)}
								classes="py-3 px-16 bg-white text-black my-10 active:bg-slate-500"
								content="{$t('Enroll for')} {convertToVND(course?.price)}"
							/>
						{:else}
							<Button2
								onclick={async () => {
									enroll($currentUser.UserID, course.id);
									goto(`/overall/${course.id}`);
								}}
								classes="py-3 px-16 bg-white text-black my-10"
								content={$t('Enroll for free')}
							/>
						{/if}
					{/if}

					{#if course?.inWishList == true}
						<button class="text-yellow-100 pl-3"
							><div class="text-4xl">
								<Icon icon="pepicons-pop:bookmark-filled-circle" />
							</div></button
						>
					{:else if course?.inWishList == false}
						<button on:click={AddToWishList} class="hover:text-yellow-100 text-slate-400 pl-3"
							><div class="text-4xl">
								<Icon icon="pepicons-pop:bookmark-filled-circle" />
							</div></button
						>
					{/if}
				{:else}
					<Button2
						classes="py-3 px-16 bg-white text-black my-10"
						content="Sign in to enroll"
						onclick={() => goto('/')}
					/>
				{/if}
			</div>

			<div>There are {enrollNumber} already enrolled</div>
		</div>
		<div class="w-1/3 text-center overflow-hidden">
			{#if course?.isEnrolled == true}
				<div class=""><PercentCircle p={completionPercentage} /></div>
			{:else if course?.isEnrolled == false}
				<div class="text-2xl">Offered by</div>
				<img alt="logo" class="w-fit" src={Logo} />
			{/if}
		</div>
	</div>

	<div class="mt-10 px-40">
		<div class="flex text-2xl mb-10">
			{#each sections as s}
				<div
					tabindex="0"
					role="button"
					on:keydown={() => (section = s)}
					on:click={() => (section = s)}
					class="mr-10 {s == section ? 'underline underline-offset-8' : ''}"
				>
					{$t(s)}
				</div>
			{/each}
		</div>

		<div class="my-20">
			{#if section == 'Introduction'}
				<div>
					{course.description}
				</div>
			{:else if section == 'Sysllabus'}
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
			{:else if section == 'Comments'}
				<CommentContainer
					type="course"
					courseId={course.id}
					bind:comments
					getComment={() => getCommentByCourse(course.id)}
				/>
			{:else if section == 'Evaluation'}
				<div class="text-lg flex justify-center items-center">
					<p>{$t('Help us improve course quality by contribute you feedback')}</p>
				</div>
				<div>
					<div
						class="grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible"
					>
						<div class="inline-flex items-center">
							<button
								disabled={evaluationState == false ? true : false}
								on:click={() => (rating = 1)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 1 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 1 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 1 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button
								disabled={evaluationState == false ? true : false}
								on:click={() => (rating = 2)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 2 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 2 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 2 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button
								disabled={evaluationState == false ? true : false}
								on:click={() => (rating = 3)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 3 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 3 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 3 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button
								disabled={evaluationState == false ? true : false}
								on:click={() => (rating = 4)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill={rating >= 4 ? 'currentColor' : 'none'}
									stroke="currentColor"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 4 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										fill-rule="evenodd"
										d={rating >= 4 ? fullStar : emptyStar}
										clip-rule="evenodd"
									></path>
								</svg></button
							><button
								disabled={evaluationState == false ? true : false}
								on:click={() => (rating = 5)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill={rating >= 5 ? 'currentColor' : 'none'}
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									class="w-6 h-6 {rating >= 5 ? 'text-yellow-300' : ''} cursor-pointer"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d={rating >= 5 ? fullStar : emptyStar}
									>
									</path>
								</svg></button
							>
						</div>
					</div>
				</div>
				<div class="flex justify-center items-center">
					<button
						on:click={evaludatioHandle}
						class=" rounded-md px-3 py-3 text-white {evaluationState
							? 'hover:bg-green-600 bg-green-500'
							: 'hover:bg-red-500 bg-red-400'}">Submit</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>

<Modal
	title="Payment"
	bind:open={paymentModal}
	on:close={() => {
		paymentModal = false;
	}}
>
	<div class="flex justify-center">
		<button
			on:click={() => payment('MOMO')}
			class="w-2/5 hover:shadow-xl hover:-translate-y-5 transition-all mr-5"
			><img class="w-full border rounded-xl" alt="Momo" src={Momo} /></button
		>
		<button
			on:click={() => payment('VNPAY')}
			class="w-2/5 hover:shadow-xl hover:-translate-y-5 transition-all"
			><img class="w-full border rounded-xl" alt="VNPay" src={VNPay} /></button
		>
	</div>
</Modal>
