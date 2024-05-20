<script>
	import { currentUser } from '../stores/store';
	import { headerAdminData, headerData } from '../data/data';
	import { t } from '../translations/i18n';
	import { page } from '$app/stores';
</script>

<main class="relative md:hidden">
	<div class="absolute w-screen z-10 bg-white shadow-lg py-3">
		{#if $currentUser?.Role?.includes('Admin')}
			{#each headerAdminData as header}
				<li class="w-3/4 flex justify-center items-center my-3 bg-gray-100 m-auto">
					<a
						href={header.link}
						class="flex rounded-md justify-center items-center w-full px-2 py-2 text-md font-medium lg:lg-7 hover:bg-green-100 hover:text-green-500 {$page.url.pathname.includes(
							header.link
						)
							? 'text-blue-500'
							: ''}">{$t(header.display)}</a
					>
				</li>
			{/each}
		{:else}
			{#each headerData as header}
				<li class="w-3/4 flex justify-center items-center my-3 bg-gray-100 m-auto">
					<a
						href={header.link}
						class="flex rounded-md justify-center items-center w-full px-2 py-2 text-md font-medium lg:lg-7 hover:bg-green-100 hover:text-green-500 {$page.url.pathname.includes(
							header.link
						)
							? 'text-blue-500'
							: ''}">{$t(header.display)}</a
					>
				</li>
			{/each}
		{/if}
	</div>
</main>
