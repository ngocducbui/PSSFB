<script>
    export let status="Pending"
</script>

{#if status == "Pending"}
<span class="text-yellow-300">{status}</span>
{:else if status == "Accepted"}
<span class="text-lime-500">{status}</span>
{:else if status == "Rejected"}
<span class="text-red-500">{status}</span>
{/if}