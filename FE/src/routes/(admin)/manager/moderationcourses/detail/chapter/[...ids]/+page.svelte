<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import AdminCourseSb from '../../../../../../../components/AdminCourseSB.svelte';
	import AdminSystemSb from '../../../../../../../components/AdminSystemSB.svelte';

	export let data: any;
	let course = data.course;
	let chapter = data.chapter;
</script>

<div class="flex">
	<div class="w-4/5">
		<Label defaultClass=" mb-3 block">Detail Chapter</Label>
		<hr class="my-3" />
		<Label defaultClass=" mb-3 block">Chapter Name</Label>
		<div>{chapter.name}</div>
		
		<Label defaultClass=" mb-3 block">Part</Label>
		<div>{chapter.part}</div>
	</div>
	<div class="w-1/5 min-h-screen ml-20">
		<AdminSystemSb bind:course />
	</div>
</div>
