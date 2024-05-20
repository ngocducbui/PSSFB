<script lang="ts">
	export let name: string = '';
	export let placehoder: string = '';
	// export let type:string = ''
	export let readonly: boolean = false;
	export let value: any = '';
	export let required: boolean = false;
	export let classes: string = '';
	export let onChange: any = () => {};
	export let onKeyDown: any = () => {};
</script>

<input
	on:keydown={onKeyDown}
	on:change={onChange}
	class="{classes} py-3 px-5 font-light text-black rounded-md"
	{required}
	{name}
	placeholder={placehoder}
	{readonly}
	bind:value
/>
