<script>
	import EditPostPage from "../../../../../pages/EditPostPage.svelte";

	
export let data
const post = data.post
</script>
<div class="pt-24 px-40">
    <EditPostPage {post}/>
</div>