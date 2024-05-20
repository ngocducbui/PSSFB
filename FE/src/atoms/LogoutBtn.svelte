<script lang="ts">
	import axios from 'axios';
	import { logout } from '../firebase';
	import { currentUser } from '../stores/store';
	import { goto } from '$app/navigation';
	import { t } from '../translations/i18n';

	const onLogout = async () => {
		localStorage.removeItem('user');
		currentUser.set(undefined);
		logout();
		//await axios.post('/?/logout', JSON.stringify({}));

		goto('/');
	};
</script>

<button
	on:click={onLogout}
	class="bg-blue-500 text-sm lg:text-md rounded-lg px-2 py-1 lg:px-3 lg:py-3 font-medium text-white items-center inline-flex border-2 hover:-translate-x-2 hover:text-blue hover:bg-black transition ease-in-out"
	>{$t('Logout')}</button
>
