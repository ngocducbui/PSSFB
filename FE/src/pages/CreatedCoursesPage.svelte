<script lang="ts">
	import CourseContainer from '../components/CourseContainer.svelte';
	import Button from '../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pageStatus } from '../stores/store';
	import { deleteModCourse, getCreatingCourseByUser } from '$lib/services/ModerationServices';
	import { showToast } from '../helpers/helpers';
	import { getAllCourses } from '$lib/services/CourseServices';

	export let courses: any = [];
	const DeleteCourse = async (id: number) => {
		pageStatus.set('load');
		try {
			const response = await deleteModCourse(id);
			courses = await getCreatingCourseByUser($currentUser.UserID);
			console.log(response);
			showToast('Deleted course', 'Deleted course successfully', 'success');
		} catch (error) {
			showToast('Deleted course', 'something went wrong', 'error');
		}
		pageStatus.set('done');
	};
</script>

<div class="md:pl-5">
	<Button onclick={() => goto('/manager/coursesmanager/addcourse')} content="Add Course" />
</div>
<div class="flex flex-wrap w-full items-center py-7 md:py-10">
	{#if courses?.length > 0}
		{#each courses as c}
			<div class="md:w-1/3 w-full md:p-5">
				<CourseContainer course={c} {DeleteCourse} />
			</div>
		{/each}
	{:else}
		<div>There is no course</div>
	{/if}
</div>
