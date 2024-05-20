<script lang="ts">
	import { goto } from "$app/navigation";
	import { getAllCourses } from "$lib/services/CourseServices";
	import { getAllPost } from "$lib/services/ForumsServices";
	import { checkExist } from "../../../helpers/helpers";
	import LearningPage from "../../../pages/LearningPage.svelte";
	import LoadingPage from "../../../pages/LoadingPage.svelte";
	import { currentUser } from "../../../stores/store";

//export let data:any
//const promise = data.promise
const p = async () => {
	console.log("learning", $currentUser?.UserID)
        const courses = await getAllCourses("All", '',1,8, $currentUser?.UserID)
        const posts = await getAllPost();
        return {
            courses,
            posts
        }
    }
const promise = p()

</script>

{#await promise}
<LoadingPage />
{:then data} 
<LearningPage {data}/>
{:catch error}
<div>{error.message}</div>
{/await}

