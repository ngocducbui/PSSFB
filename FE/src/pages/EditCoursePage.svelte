<script lang="ts">
	import { Textarea, Select, Label, Toolbar, ToolbarGroup, ToolbarButton } from 'flowbite-svelte';

	// import { PaperClipOutline, MapPinAltSolid, ImageOutline, CodeOutline, FaceGrinOutline, PapperPlaneOutline } from 'flowbite-svelte-icons';

	import { afterUpdate, beforeUpdate } from 'svelte';
	import {
		checkExist,
		checkNumber,
		convertVNDToNumber,
		isVND,
		showToast
	} from '../helpers/helpers';
	import { goto } from '$app/navigation';
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import { language } from '../data/data';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import Dropzone from 'svelte-file-dropzone';
	import { currentUser, pageStatus } from '../stores/store';
	import { getURL, uploadImage } from '../firebase';
	import { updateCourse } from '$lib/services/ModerationServices';

	export let course: any;

	// if (form?.type == 'success') {
	// 	showToast('Edit Course', form.message, form.type);
	// } else if (form?.type == 'error') {
	// 	showToast('Edit Course', form.message, form.type);
	// }

	let image: any;

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

		if (isVND(course.price + '')) {
			course.price = convertVNDToNumber(course.price);
		}

		pageStatus.set('load');
		if (checkExist(image)) {
			await uploadImage(image);
			const url = await getURL(image?.path);
			if (!checkExist(url)) {
				showToast('Edit course', 'something went wrong', 'error');
				return;
			} else {
				course.picture = url;
			}
		}

		const response = await updateCourse(course);
		showToast('Edit course success', 'Edit course success', 'success');

		pageStatus.set('done');
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

<div class="flex">
	<div class="w-3/5 m-auto">
		<form on:submit={frmSubmit} method="POST" action="?/editcourse">
			<input hidden name="id" value={course.id} />
			<input readonly hidden name="createdBy" value={$currentUser?.UserID} />
			<p class=" mb-1 font-medium text-3xl">Edit Course</p>
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

			<Label defaultClass=" mb-3 block">Description</Label>
			<div class="mb-5">
				<Textarea name="description" bind:value={course.description} placeholder="Description" />
			</div>
			<Label defaultClass=" mb-3 block">Picture</Label>
			<!-- <Input
				required={true}
				name="picture"
				value={course?.picture}
				classes="block w-1/3  border mb-5"
				placehoder="url link"
			/> -->
			<Dropzone containerClasses="  mb-5" on:drop={handleFilesSelect} />
			<div class="flex mb-5">
				<div class="w-1/3 mr-5">
					Old picture
					<img src={course?.picture} alt="img" />
				</div>
				<div class="w-1/3 mr-5">
					New picture
					<img class="hidden" id="img" alt="img" />
				</div>
			</div>
			<Label>
				Language
				<Select name="tag" class="mt-2 " items={language} bind:value={course.tag} />
			</Label>

			<div class="mt-5">
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
	<div class="w-72">
		<AdminCourseSb bind:course />
	</div>
</div>
