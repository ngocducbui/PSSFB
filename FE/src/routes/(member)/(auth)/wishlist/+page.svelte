<script>
	import { getWishList } from "$lib/services/CourseServices";
	import LoadingPage from "../../../../pages/LoadingPage.svelte";
	import WishListPage from "../../../../pages/WishListPage.svelte";
	import { currentUser } from "../../../../stores/store";

    const promise = getWishList($currentUser?.UserID)
</script>

{#await promise}
    <LoadingPage />
{:then result} 
    <WishListPage {result} />
{/await}