<script>
	import BigLogBlack from '../assets/Xanh final.png';
	import { t } from '../translations/i18n';
</script>

<div
	class="bg-white text-black flex justify-center md:justify-between md:pt-10 pt-5 border-t-2 border-gray-300 m-auto mt-2 md:text-lg text-xs"
>
	<div class="md:flex hidden mr-10 justify-center">
		<img alt="blb" class="" width="250px" src={BigLogBlack} />
	</div>
	<div class="flex-grow flex justify-around md:mt-10">
		<div class="">
			<div class="text-blue-500 text-xl font-medium mb-5">{$t('Links')}</div>
			<div class="mb-5">{$t('Learning')}</div>
			<div class="mb-5">{$t('Leaderboard')}</div>
		</div>
		<div class="">
			<div class="text-blue-500 text-xl font-medium mb-5">{$t('Information')}</div>
			<div class="mb-5">{$t('About Us')}</div>
		</div>
		<div class="">
			<div class="text-blue-500 text-xl font-medium mb-5">{$t('Helps')}</div>
			<div class="mb-5">{$t('Help')}</div>
			<div class="mb-5">{$t('Forums')}</div>
			<div class="mb-5">{$t('Contact Us')}</div>
		</div>
	</div>
</div>
