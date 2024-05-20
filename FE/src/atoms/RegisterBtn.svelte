<script>
	import { t } from "../translations/i18n";

	export let onClick = () => {};
</script>

<button
	on:click={onClick}
	class="bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-sm px-2 py-2 lg:px-3 lg:py-3 lg:text-md mr-2 lg:mr-3 font-medium items-center inline-flex border-2 hover:-translate-x-2 transition ease-in-out"
	>{$t('Register')}</button
>
