<script lang="ts">
	import { goto } from '$app/navigation';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { currentUser, pageStatus } from '../../../stores/store';
	import { checkExist } from '../../../helpers/helpers';

	onMount(() => {
		const user = localStorage.getItem('user') ?? '';

		if (checkExist(user)) {
			currentUser.set(JSON.parse(user));
			console.log('currentUser', $currentUser);
		}
	});

	// afterUpdate(async () => {
	// 	if (!$currentUser) {
	// 		goto('/');
	// 	} else if ($currentUser?.Role.includes('Admin')) {
	// 		goto('/manager');
	// 	}
	// });
</script>

<slot />
