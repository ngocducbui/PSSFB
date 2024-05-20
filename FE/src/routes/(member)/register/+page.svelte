<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import bigLogBlack from '../../../assets/Trắng final.png';
	import LoginContainer from '../../../components/LoginContainer.svelte';
	import RegisterContainer from '../../../components/RegisterContainer.svelte';
	import { checkExist, showToast } from '../../../helpers/helpers';
	import { currentUser } from '../../../stores/store';
	import { goto } from '$app/navigation';

	export let form: any;
	if (form?.type == 'error') {
		showToast(`${form?.error ?? 'error'}`, `${form?.message ?? 'something went wrong'}`, 'error');
	}

	onMount(() => {
		if (form?.user) {
			localStorage.setItem('user', JSON.stringify(form?.user));
			currentUser.setUser(form?.user);
		}
	});

	beforeUpdate(async () => {
		if (checkExist($currentUser)) {
			if ($currentUser?.Role.includes('Admin')) {
				goto('/manager');
			} else if ($currentUser?.Role.includes('Student')) {
				goto('/learning');
			}
		}
	});
</script>

<div class="overflow-x-auto md:h-[calc(100vh-64px)] h-[calc(100vh-64px)] bg-blue-950 text-white">
	<div class="h-full flex items-center justify-center md:justify-between">
		<img alt="blb" class="md:block hidden w-3/6" src={bigLogBlack} />
		<div class="md:w-2/6 md:mr-24"><RegisterContainer /></div>
	</div>
</div>
