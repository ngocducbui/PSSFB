<script lang="ts">
	export let name: string = '';
	export let placehoder: string = '';
	// export let type:string = ''
	export let readonly: boolean = false;
	export let value: string = '';
	export let required: boolean = false;
	export let classes = 'w-full';
	export let onChange: any = () => {};
</script>

<input
	on:change={onChange}
	class="{classes} py-3 px-5 font-light text-black rounded-md"
	{required}
	type="password"
	{name}
	placeholder={placehoder}
	{readonly}
	bind:value
	autocomplete="new-password"
/>
