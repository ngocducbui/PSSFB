<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import axios from 'axios';
	import { formatDate } from '../../../../../../helpers/datetime';

	// @ts-ignore
	let paginators = $page.state.paginators;
	// @ts-ignore
	export let data;

	let status = data?.status;
	let banModalStatus = false;

	const banHandle = async () => {
		banModalStatus = false;
		const result = await axios.put(
			`https://authenticateservice.azurewebsites.net/api/Authenticate/ChangeStatus?userId=${$page.params.slug}`
		);
		status = !status;
	};
</script>

<main>
	<div class="w-5/6 md:w-3/4 m-auto">
		<div class="md:mx-5 md:mt-3 mt-2">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				class="w-16 h-16 md:h-20 md:w-20 object-cover rounded-full"
				src={data?.profilePict}
				alt="Current profile photo"
			/>
			<!-- <label class="block pt-2">
				<span class="sr-only t-2">Choose profile photo</span>
				<input
					type="file"
					class="w-full text-sm text-slate-500
				  file:mr-4 file:py-2 file:px-4
				  file:rounded-full file:border-0
				  file:text-sm file:font-semibold
				  file:bg-pink-300 file:text-zinc-900
				  hover:file:bg-rose-300
				"
				/>
			</label> -->
		</div>
		<div class="md:mx-5 md:my-5 my-3">
			<label class="relative block md:p-3 px-2 py-2 border-2 border-black rounded" for="username">
				<span class="text-sm md:text-md font-semibold text-zinc-900">User Name </span>
				<input
					class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
					autocomplete="off"
					id="username"
					type="text"
					value={data?.userName}
					readonly
				/>
			</label>
		</div>
		<div class="md:mx-5 md:my-5 my-3">
			<label class="relative block md:p-3 px-2 py-2 border-2 border-black rounded" for="fullname">
				<span class="text-sm md:text-md font-semibold text-zinc-900">Full Name </span>
				<input
					class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
					autocomplete="off"
					id="fullname"
					type="text"
					value={data?.fullName}
					readonly
				/>
			</label>
		</div>

		<div class="flex">
			<div class="w-1/2 md:mx-5 mr-2">
				<label class="relative block md:p-3 px-2 py-2 border-2 border-black rounded" for="phone">
					<span class="text-sm md:text-md font-semibold text-zinc-900">Phone Number</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="phone"
						type="text"
						value={data?.phone}
						readonly
					/>
				</label>
			</div>
			<div class="w-1/2 md:mx-5 ml-2">
				<label
					class="relative block md:p-3 px-2 py-2 border-2 border-black rounded"
					for="birthDate"
				>
					<span class="text-sm md:text-md font-semibold text-zinc-900">BirthDate</span>
					<input
						class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
						autocomplete="off"
						id="birthDate"
						type="text"
						value={formatDate(data?.birthDate)}
						readonly
					/>
				</label>
			</div>
		</div>
		<div class="  md:mx-5 md:my-5 my-3">
			<label class="relative block md:p-3 px-2 py-2 border-2 border-black rounded" for="email">
				<span class="text-sm md:text-md font-semibold text-zinc-900">Email</span>
				<input
					class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
					autocomplete="off"
					id="email"
					type="text"
					value={data?.email}
					readonly
				/>
			</label>
		</div>

		<div class=" md:mx-5 md:my-5 my-3">
			<label class="relative block md:p-3 px-2 py-2 border-2 border-black rounded" for="address">
				<span class="text-sm md:text-md font-semibold text-zinc-900">Address</span>
				<input
					class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
					autocomplete="off"
					id="address"
					type="text"
					value={data?.address}
					readonly
				/>
			</label>
		</div>
		<div class=" md:mx-5 md:my-5 my-3">
			<label class="relative block md:p-3 px-2 py-2 border-2 border-black rounded" for="fblink">
				<span class="text-sm md:text-md font-semibold text-zinc-900">Facebook Link</span>
				<input
					class="w-full bg-transparent p-0 text-xs md:text-sm text-gray-500 border-none focus:shadow-none focus:ring-0"
					autocomplete="off"
					id="fblink"
					type="text"
					value={data?.facebookLink}
					readonly
				/>
			</label>
		</div>

		<button
			on:click={() => (banModalStatus = true)}
			class="md:px-5 px-3 py-2 md:py-3 bg-red-600 rounded-lg text-white border-black border-2 hover:bg-red-500 float-end md:mx-5"
		>
			{#if status == true}
				<p>Ban Account</p>
			{:else}
				<p>Unban Account</p>
			{/if}
		</button>
	</div>
	<div class="mt-5">
		<!--Ban Model PopUp-->
		<div
			class="{banModalStatus
				? ''
				: 'hidden'} flex justify-center items-center w-screen h-screen fixed top-0 left-0"
		>
			<div class=" fixed top-0 left-0 w-screen h-screen bg-black opacity-30"></div>
			<div class="absolute p-4 w-full max-w-md max-h-full">
				<div class="relative bg-white rounded-lg shadow">
					<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
						<h3 class="text-2xl font-semibold text-red-600">Warning</h3>
						<button
							on:click={() => {
								banModalStatus = false;
							}}
							class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
							data-modal-hide="default-modal"
						>
							<svg
								class="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span class="sr-only">Close modal</span>
						</button>
					</div>
					<div class="p-4 md:p-5 space-y-4">
						<p>Do you really want to {status ? 'Ban' : 'UnBan'} this account</p>
					</div>
					<div class="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
						<button
							on:click={banHandle}
							type="button"
							class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>I accept</button
						>
						<button
							on:click={() => {
								banModalStatus = false;
							}}
							class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
							>Decline</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
