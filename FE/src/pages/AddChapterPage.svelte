<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { handlePosetiveInput, showToast } from '../helpers/helpers';
	import AdminCourseSb from '../components/AdminCourseSB.svelte';
	import { afterUpdate } from 'svelte';

	export let form: any;
	export let course: any;
	let chapter: any = form?.response;

	if (form?.type == 'success') {
		showToast('Add Chapter', form.message, form.type);
	} else if (form?.type == 'error') {
		showToast('Add Chapter', form.message, form.type);
	}

	afterUpdate(() => {
		if (form?.response && form?.type == 'success') {
			goto(`/manager/coursesmanager/addcourse/addlesson/${course.id}/${chapter.id}`);
		}
	});

	const onsubmit = (event: any) => {
		const part: any = document.getElementById('partinput');
		if (part.value < 1) {
			showToast('Part input', 'Part must be greater than or equal 1', 'warning');
			event.preventDefault();
		}
	};
</script>

<div class="flex">
	<div class="w-3/5 m-auto mt-8">
		<form method="POST" on:submit={onsubmit} action="?/addchapter">
			<p class=" mb-1 font-medium text-3xl">Add Chapter</p>
			<hr class="my-1 mb-8" />
			<div>
				<p class=" mb-1">Add Chapter Name</p>
				<Input classes=" border w-full" name="name" placehoder="chapter name" />
			</div>
			<div class="mt-5">
				<p class=" mb-1">Part</p>
				<input
					min="1"
					id="partinput"
					type="number"
					name="part"
					class="block w-full border mb-5 py-3 px-5 font-light text-black rounded-md"
					required
				/>
			</div>
			<div class="flex justify-end mt-4">
				<Button content="Save" />
			</div>
		</form>
	</div>
	<div class="md:w-72">
		<AdminCourseSb bind:course />
	</div>
</div>
