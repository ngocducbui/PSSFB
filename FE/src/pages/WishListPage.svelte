<script lang="ts">
	import { Select } from 'flowbite-svelte';
	import Input from '../atoms/Input.svelte';
	import CourseContainer from '../components/CourseContainer.svelte';
	import SkillsSet from '../components/SkillsSet.svelte';
	import Pagination from '../components/Pagination.svelte';
	import { getWishList, removeWishList } from '$lib/services/CourseServices';
	import { currentUser, pageStatus } from '../stores/store';
	import { tags } from '../data/data';
	import WishListContainer from '../components/WishListContainer.svelte';

	export let result: any;
	$: courses = result.items;
	let searchStr = '';
	let tag = 'All';
	const pagiClick = async (page: number) => {
		result = await getWishList($currentUser.UserID,tag, searchStr, page);
		console.log(result);
	};

	const searchFunc = async (event: any) => {
		pageStatus.set('load');
		if (event.keyCode === 13) {
			// Your code to handle Enter key press
			try {
				result = await getWishList($currentUser.UserID, tag, searchStr);
			} catch (err) {
				console.log(err);
			}
		}
		pageStatus.set('done');
	};

	const tagChange = async () => {
		pageStatus.set('load');

		try {
			result = await getWishList($currentUser.UserID, tag);
		} catch (err) {
			console.log(err);
		}

		pageStatus.set('done');
	};

	const RemoveFromWishList = async (wishListId:number) => {
		pageStatus.set('load')
		try {
			await removeWishList(wishListId)
			result = await getWishList($currentUser.UserID,tag, searchStr)
		} catch (error) {
			console.log(error);
		}
		pageStatus.set('done')
	}
</script>

<div>
	<div class="bg-blue-950 text-white px-20 pb-10 pt-20 font-medium">
		<div class="text-3xl mb-10">Choose your favorite course and start right now!</div>
		<Input onKeyDown={searchFunc} bind:value={searchStr} classes="w-1/4 mr-3" placehoder="search" />
		<div class="w-2/12 inline-block">
			<Select on:change={tagChange} items={tags} bind:value={tag} />
		</div>
	</div>
	<div class="mb-10 mt-20 px-20 flex flex-wrap">
		{#if courses?.length > 0}
			{#each courses as c}
				<div class="relative w-1/4 h-[450px] p-5 mb-10">
					<WishListContainer {RemoveFromWishList} course={c} />
				</div>
			{/each}
		{:else}
			<div class="p-5">There are no course avaiable</div>
		{/if}
	</div>
	<Pagination pagi={result} {pagiClick} />
	<div class="px-20"><SkillsSet /></div>
</div>
