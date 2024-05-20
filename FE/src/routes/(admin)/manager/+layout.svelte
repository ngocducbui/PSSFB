<script lang="ts">
	import { goto } from '$app/navigation';
	import { afterUpdate, beforeUpdate } from 'svelte';
	import { currentUser } from '../../../stores/store';
	import logo from '../../../assets/Xanh final.png';
	import { page } from '$app/stores';
	import { t } from '../../../translations/i18n';

	let section = 'Courses Lists';
	const sections = ['Courses Lists', 'Add Course', 'Posts List', 'Add Post'];
	let showStatus = true;

	afterUpdate(async () => {
		if (!$currentUser) {
			goto('/');
		} else if ($currentUser?.Role.includes('Student')) {
			goto('/learning');
		}
	});
</script>

<main>
	<div class="h-[calc(100vh-64px)] lg:h-[calc(100vh-96px)]">
		<div class="relative flex h-full">
			<!--side bar-->
			<div class="h-full w-full">
				<div
					class="overflow-scroll w-full h-full text-black border border-neutral-300 bg-white p-10"
				>
					<div class={showStatus ? 'ml-72' : ''}>
						<slot />
					</div>
				</div>
			</div>
			{#if showStatus}
				<aside
					class="fixed flex-col w-full md:w-72 h-full px-5 pt-8 overflow-y-auto bg-white border-r-2 border-gray-400"
				>
					<button
						on:click={() => (showStatus = false)}
						class="absolute top-2 right-2 border-2 border-gray-300 hover:bg-red-200 rounded-md p-1 md:hidden block"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							{...$$props}
						>
							<path fill="currentColor" d="M15 18h-1.5l-6-6l6-6H15zm-4.67-6L13 14.67V9.33z" />
						</svg>
					</button>
					<a href="/manager">
						<img class="w-auto h-20 bg-gray-200" src={logo} alt="" />
					</a>
					<div class="flex flex-col justify-between flex-1 mt-6">
						<nav class="-mx-3 space-y-6">
							<!--Public-->
							<!--Course Manager-->
							<div class="space-y-3">
								<p class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
									{$t('Courses Manager')}
								</p>
								{#if $currentUser?.Role == 'AdminSystem'}
									<a
										class="{$page.url.pathname.includes('/manager/moderationcourses')
											? 'bg-green-200 hover:bg-green-400'
											: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:text-gray-700"
										href="/manager/moderationcourses"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											{...$$props}
										>
											<path
												fill="currentColor"
												d="M6.5 2A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h6.31a6.518 6.518 0 0 1-1.078-1.5H6.5a1 1 0 0 1-1-1h5.813a6.5 6.5 0 0 1 9.187-7.768V4.5A2.5 2.5 0 0 0 18 2zM8 5h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m15 12.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-5 .5l.001 2.503a.5.5 0 1 1-1 0V18h-2.505a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.497a.5.5 0 0 1 0 1z"
											/>
										</svg>

										<span class=" mx-2 text-sm font-medium">{$t('Moderation Courses')}</span>
									</a>
								{/if}
								{#if $currentUser?.Role == 'AdminBussiness'}
									<a
										class="{$page.url.pathname.includes('/manager/creattingcourses')
											? 'bg-green-200 hover:bg-green-400'
											: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:text-gray-700"
										href="/manager/creattingcourses"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											{...$$props}
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6M8 3v9l3-3l3 3V3M8 3h6m0 0h4a2 2 0 0 1 2 2v7m-1 4v3m0 3v-3m0 0h3m-3 0h-3"
											/>
										</svg>

										<span class="mx-2 text-sm font-medium">{$t('Created Courses')}</span>
									</a>
									<a
										class="{$page.url.pathname.includes('/manager/coursesmanager/addcourse')
											? 'bg-green-200 hover:bg-green-400'
											: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
										href="/manager/coursesmanager/addcourse"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											{...$$props}
										>
											<path
												fill="currentColor"
												d="M18 4h-5v8l-2.5-2.25L8 12V4H6v16h6.08c.1.71.31 1.38.61 2H6c-1.11 0-2-.89-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.08c-.33-.05-.66-.08-1-.08c-.34 0-.67.03-1 .08zm5.8 16.4c.1 0 .1.1 0 .2l-1 1.7c-.1.1-.2.1-.3.1l-1.2-.4c-.3.2-.5.3-.8.5l-.2 1.3c0 .1-.1.2-.2.2h-2c-.1 0-.2-.1-.3-.2l-.2-1.3c-.3-.1-.6-.3-.8-.5l-1.2.5c-.1 0-.2 0-.3-.1l-1-1.7c-.1-.1 0-.2.1-.3l1.1-.8v-1l-1.1-.8c-.1-.1-.1-.2-.1-.3l1-1.7c.1-.1.2-.1.3-.1l1.2.5c.3-.2.5-.3.8-.5l.2-1.3c0-.1.1-.2.3-.2h2c.1 0 .2.1.2.2l.2 1.3c.3.1.6.3.9.5l1.2-.5c.1 0 .3 0 .3.1l1 1.7c.1.1 0 .2-.1.3l-1.1.8v1zM20.5 19c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5s.7 1.5 1.5 1.5s1.5-.7 1.5-1.5"
											/>
										</svg>

										<span class="mx-2 text-sm font-medium">{$t('Add Courses')}</span>
									</a>
								{/if}
							</div>
							<!--Post Manager-->
							<div class="space-y-3">
								<p class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Posts Manager</p>
								<a
									class="{$page.url.pathname.includes('/manager/moderationposts')
										? 'bg-green-200 hover:bg-green-400'
										: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
									href="/manager/moderationposts"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="0 0 24 24"
										{...$$props}
									>
										<path fill="currentColor" d="M3 21V3h18v18zm3-7h12v-2H6zm0 3h12v-1.5H6z" />
									</svg>

									<span class="mx-2 text-sm font-medium">{$t('Moderation Post')}</span>
								</a>

								<a
									class="{$page.url.pathname.includes('/manager/postmanager/addpost')
										? 'bg-green-200 hover:bg-green-400'
										: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
									href="/manager/postmanager/addpost"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="0 0 24 24"
										{...$$props}
									>
										<path
											fill="currentColor"
											d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h9v2H5v14h14v-9h2v9q0 .825-.587 1.413T19 21zm3-4v-2h8v2zm0-3v-2h8v2zm0-3V9h8v2zm9-2V7h-2V5h2V3h2v2h2v2h-2v2z"
										/>
									</svg>

									<span class="mx-2 text-sm font-medium"> {$t('Add Post')}</span>
								</a>
							</div>
							<!--User Manager-->
							<div class="space-y-3">
								{#if $currentUser?.Role == 'AdminSystem'}
									<p class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
										User Manager
									</p>
									<a
										class="{$page.url.pathname.includes('/manager/usermanager')
											? 'bg-green-200 hover:bg-green-400'
											: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
										href="/manager/usermanager"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											{...$$props}
										>
											<path
												fill="none"
												stroke="currentColor"
												d="M18.5 20.247V16S16 14.5 12 14.5S5.5 16 5.5 16v4.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Zm10.426.5S8.5 10.68 8.5 8c0-1.933 1.569-3.5 3.504-3.5A3.495 3.495 0 0 1 15.5 8c0 2.68-3.426 4.5-3.426 4.5z"
											/>
										</svg>

										<span class="mx-2 text-sm font-medium">{$t('Student Manager')}</span>
									</a>
									<a
										class="{$page.url.pathname.includes('/manager/bamanager')
											? 'bg-green-200 hover:bg-green-400'
											: 'hover:bg-gray-200'} flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
										href="/manager/bamanager"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
											{...$$props}
										>
											<path
												fill="currentColor"
												d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12M4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"
											/>
											<circle cx="12" cy="8.5" r="2.5" fill="currentColor" />
											<path
												fill="currentColor"
												d="M7 15a5.782 5.782 0 0 0 5 3a5.782 5.782 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3"
											/>
										</svg>

										<span class="mx-2 text-sm font-medium">{$t('Business Admin Manager')}</span>
									</a>
								{/if}
							</div>
						</nav>
					</div>
				</aside>
			{:else}
				<button
					class="absolute h-fit hover:text-green-400 p-1"
					on:click={() => (showStatus = true)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						{...$$props}
					>
						<g fill="none">
							<path
								fill="currentColor"
								d="M9 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
							/>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-width="1.5"
								d="M22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"
							/>
						</g>
					</svg>
				</button>
			{/if}
		</div>
	</div>
</main>
