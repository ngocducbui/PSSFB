<script>
	import Avatar from '../../../atoms/Avatar.svelte';
	import Button2 from '../../../atoms/Button2.svelte';
	import Button from '../../../atoms/Button.svelte';
	import Input from '../../../atoms/Input.svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch
	} from 'flowbite-svelte';
</script>

<main class="bg-neutral-100 pt-5">
	<div class="w-4/5 m-auto">
		<div class="mb-10">Home > Leaderboard</div>
		<div class="flex justify-between">
			<div><Button2 classes="border" content="Learner" /></div>
			<div class="flex">
				<Button2 classes="border mr-3" content="All time" />
				<Button classes="mr-3" content="Month" />
				<Button content="Week" />
			</div>
		</div>

		<div class="flex justify-between my-10">
			<div class="w-1/3">
				<div class="w-10/12 m-auto border rounded-xl pt-10 bg-white text-center">
					<Avatar classes="m-auto my-5 w-2/12" />
					<div class="text-xl my-5">Steven Siren</div>
					<div class="bg-neutral-300 rounded-b-xl py-2 font-medium">Day streak: 96</div>
				</div>
			</div>
			<div class="w-1/3">
				<div class="w-full m-auto border rounded-xl pt-10 bg-white text-center">
					<Avatar classes="m-auto my-5 w-2/12" />
					<div class="text-xl my-5">Steven Siren</div>
					<div class="bg-yellow-400 rounded-b-xl py-2 font-medium">Day streak: 120</div>
				</div>
			</div>
			<div class="w-1/3">
				<div class="w-9/12 m-auto border rounded-xl pt-10 bg-white text-center">
					<Avatar classes="m-auto my-5 w-2/12" />
					<div class="text-xl my-5">Steven Siren</div>
					<div class="bg-yellow-600 rounded-b-xl py-2 font-medium">Day streak: 92</div>
				</div>
			</div>
		</div>

		<Input classes="mb-10 w-1/4" placehoder="search" />

		<Table>
			<TableHead>
				<TableHeadCell>#</TableHeadCell>
				<TableHeadCell>UserName</TableHeadCell>
				<TableHeadCell>Email</TableHeadCell>
				<TableHeadCell>Day streak</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				<TableBodyRow>
					<TableBodyCell>1</TableBodyCell>
					<TableBodyCell>Steven Siren</TableBodyCell>
					<TableBodyCell>StevenSiren@gmail.com</TableBodyCell>
					<TableBodyCell>120</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>2</TableBodyCell>
					<TableBodyCell>Steven Siren</TableBodyCell>
					<TableBodyCell>StevenSiren@gmail.com</TableBodyCell>
					<TableBodyCell>96</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>3</TableBodyCell>
					<TableBodyCell>Steven Siren</TableBodyCell>
					<TableBodyCell>StevenSiren@gmail.com</TableBodyCell>
					<TableBodyCell>82</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	</div>
</main>
