<script lang="ts">
	import { Textarea, Select, Label, Toolbar, ToolbarGroup, ToolbarButton } from 'flowbite-svelte';
	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';
	import Input from '../../../../../atoms/Input.svelte';

	import {
		checkExist,
		checkNumber,
		convertVNDToNumber,
		isVND,
		showToast
	} from '../../../../../helpers/helpers';
	import { goto } from '$app/navigation';
	import Button from '../../../../../atoms/Button.svelte';
	import { language, payments } from '../../../../../data/data';
	import {} from '../../../../../helpers/helpers';

	import Dropzone from 'svelte-file-dropzone';
	import { currentUser, pageStatus } from '../../../../../stores/store';
	import { getURL, uploadImage } from '../../../../../firebase';
	import { addCourse } from '$lib/services/ModerationServices';
	import Editor from '@tinymce/tinymce-svelte';

	// let inputType = 'int';

	// const addTestCase = (indexc: number, indexcq: number) => {
	// 	Chapters[indexc].codeQuestions[indexcq].testCases = [
	// 		...Chapters[indexc].codeQuestions[indexcq].testCases,
	// 		initTestCase(inputType)
	// 	];
	// };

	// const hiddenChapter = (index: number) => {
	// 	console.log('clicked');
	// 	const element: any = document.getElementById(`chap${index + 1}div`);
	// 	if (element.classList.contains('h-1')) {
	// 		element.classList.remove('h-1');
	// 		element.classList.add('h-full');
	// 	} else if (element.classList.contains('h-full')) {
	// 		element.classList.remove('h-full');
	// 		element.classList.add('h-1');
	// 	}
	// };

	// const hiddenlesson = (indexc: number, index: number) => {
	// 	const element: any = document.getElementById(`lesson${index + 1}ofc${indexc + 1}div`);
	// 	if (element.classList.contains('h-1')) {
	// 		element.classList.remove('h-1');
	// 		element.classList.add('h-full');
	// 	} else if (element.classList.contains('h-full')) {
	// 		element.classList.remove('h-full');
	// 		element.classList.add('h-1');
	// 	}
	// };

	// const hiddenCodeQuestion = (indexc: number, index: number) => {
	// 	const element: any = document.getElementById(`CodeQuestion${index + 1}ofc${indexc + 1}div`);
	// 	if (element.classList.contains('h-1')) {
	// 		element.classList.remove('h-1');
	// 		element.classList.add('h-full');
	// 	} else if (element.classList.contains('h-full')) {
	// 		element.classList.remove('h-full');
	// 		element.classList.add('h-1');
	// 	}
	// };

	// const AddChapter = () => {
	// 	Chapters = [...Chapters, initChapter()];
	// };

	// const Addlesson = (index: number) => {
	// 	Chapters[index].lessons = [...Chapters[index].lessons, initlessons()];
	// };

	// const AddCodeQuestion = (index: number) => {
	// 	Chapters[index].codeQuestions = [...Chapters[index].codeQuestions, intitCodeQuestion()];
	// };

	// const AddQuestion = (indexc: number, lindex: number) => {
	// 	Chapters[indexc].lessons[lindex].questions = [
	// 		...Chapters[indexc].lessons[lindex].questions,
	// 		initQuestion()
	// 	];
	// };

	// const AddAnswer = (indexc: number, lindex: number, qindex: number) => {
	// 	Chapters[indexc].lessons[lindex].questions[qindex].answerOptions = [
	// 		...Chapters[indexc].lessons[lindex].questions[qindex].answerOptions,
	// 		initAnswer(true)
	// 	];
	// };

	// const AddCourse = async () => {
	// 	const course = {
	// 		name: CourseName,
	// 		description: Description,
	// 		picture: Picture,
	// 		tag: Tag,
	// 		createdBy: $currentUser.UserID,
	// 		chapters: Chapters
	// 	};
	// 	console.log('addcourse', JSON.stringify(course));
	// 	await addCourse(course);
	// 	goto('/manager/courseslist');
	// };

	// export let form: any;

	// if (form?.type == 'success') {
	// 	showToast('Add Course', form.message, form.type);
	// } else if (form?.type == 'error') {
	// 	showToast('Add Course', form.message, form.type);
	// }

	let course: any = {
		name: undefined,
		description: undefined,
		picture: undefined,
		tag: 'C',
		price: 0,
		createdBy: $currentUser?.UserID
	};

	// beforeUpdate(() => {
	// 	if (form?.response && form?.type == 'success') {
	// 		goto(`addcourse/addchapter/${form?.response.id}`);
	// 	}
	// });

	let image: any;

	let payment = 'Free';

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		if (isImage(acceptedFiles[0]?.path)) {
			image = acceptedFiles[0];
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				// Create an image element or use a dedicated image component
				const imageE: any = document.getElementById('img');
				imageE.classList.remove('hidden');
				imageE.src = reader.result;
				imageE.alt = image.name;
				// Append the image to a container element in your UI
			});
			reader.readAsDataURL(image);
		}

		console.log(image);
	}

	function isImage(path: string) {
		if (
			path.includes('jpg') ||
			path.includes('jng') ||
			path.includes('gìf') ||
			path.includes('png') ||
			path.includes('svg')
		)
			return true;
		return false;
	}

	async function frmSubmit(event: any) {
		event.preventDefault();

		if (payment == 'With Fee') {
			if (isVND(course.price + '')) course.price = convertVNDToNumber(course.price);

			if (course.price < 1) {
				showToast('Add Course', 'Course price must be greater than zero', 'warning');
				return;
			}
		} else if (payment == 'Free') {
			course.price = 0;
		}

		if (!checkExist(image)) {
			showToast('Add course', 'Please upload image', 'warning');
		} else {
			pageStatus.set('load');
			await uploadImage(image);
			const url = await getURL(image?.path);
			if (!checkExist(url)) {
				showToast('Add course', 'something went wrong', 'error');
			} else {
				course.picture = url;
				console.log(JSON.stringify(course));
				try {
					const response = await addCourse(course);
					goto(`addcourse/addchapter/${response.id}`);
				} catch (error) {
					console.error(error);
				}
			}
			pageStatus.set('done');
		}
	}

	function handleKeyPress(event: any) {
		// Lấy mã phím từ sự kiện
		var keyCode = event.keyCode || event.which;

		// Kiểm tra xem mã phím có phải là mã của phím Backspace (mã 8) không
		if (keyCode === 8) {
			const priceE: any = document.getElementById('price');
			let k = priceE.value;
			console.log(isVND(priceE.value));
			// Người dùng đã nhấn phím Backspace
			if (isVND(priceE.value)) {
				k = convertVNDToNumber(priceE.value);
			}

			priceE.value = k + ''.slice(0, -1);
		}
	}
</script>

<div class="w-4/5 m-auto mt-8">
	<form on:submit={frmSubmit} method="POST" action="?/addcourse">
		<p class=" mb-1 font-medium text-3xl">Add Course</p>
		<input name="createdBy" readonly class="hidden" value={$currentUser?.UserID} />
		<hr class="my-1 mb-8" />
		<div>
			<p class=" mb-1">Course Name</p>
			<Input
				required={true}
				bind:value={course.name}
				name="name"
				classes="block w-full md:w-1/2 border mb-5"
				placehoder="Course Name"
			/>
		</div>

		<div>
			<p class="mb-1">Description</p>
			<div class="mb-5">
				<Editor
					bind:value={course.description}
					apiKey="rxzla8t3gi19lqs86mqzx01taekkxyk5yyaavvy8rwz0wi83"
				/>
			</div>
		</div>
		<div>
			<p class="mb-1">Picture</p>
			<!-- <Input
			id="imginput"
			name="picture"
			value={course?.picture}
			classes="block w-1/3 ml-4 border mb-5"
			placehoder="url link"
		/> -->
			<div class="border-2 rounded-sm border-gray-400 mb-5">
				<Dropzone containerClasses="" on:drop={handleFilesSelect} />
			</div>
			<img class="w-1/3 ml-4 mb-5 hidden" id="img" alt="img" />
		</div>
		<div>
			<Label>
				Language
				<Select name="tag" class="mt-2 " items={language} bind:value={course.tag} />
			</Label>
		</div>
		<div class="mt-5">
			<Label>
				Payment
				<Select class="mt-2 " items={payments} bind:value={payment} />
			</Label>
		</div>
		<div class="{payment == 'Free' ? 'hidden' : ''} mt-5">
			<p class=" mb-1">Price</p>
			<input
				on:keydown={handleKeyPress}
				on:input={(event) => checkNumber(event.target)}
				required={true}
				bind:value={course.price}
				id="price"
				name="price"
				class="block w-full md:w-1/3 p-2 rounded-lg border mb-5"
				placeholder="Price"
			/>
		</div>
		<div class="flex justify-end mt-5"><Button content="Save" /></div>
	</form>
</div>
