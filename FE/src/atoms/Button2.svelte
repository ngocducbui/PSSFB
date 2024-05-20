<script>
    export let content = '';
    export let classes = '';
    export let onclick = () => {}
</script>


<button on:click={onclick} class="{classes} rounded-md p-3 font-medium items-center inline-flex"
	>{content}</button
>
