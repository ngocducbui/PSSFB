<script lang="ts">
	import { checkExist } from '../helpers/helpers';

	export let classes: string = '';
	export let src: string = '';

	if (!checkExist(src)) {
		src =
			'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg';
	}
</script>

<img {src} alt="avatar" class="{classes} rounded-full object-cover" />
