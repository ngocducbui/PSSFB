<script lang="ts">
	import { Rating, AdvancedRating, ScoreRating } from 'flowbite-svelte';
	import { skills } from '../data/data';
</script>

<div class="border p-5 flex flex-wrap bg-white">
	{#each skills as skill}
		<div class="flex w-1/3 pr-10 justify-between items-center mb-5">
			<div class="flex items-center">
                <img src={skill.icon} alt="skillicon" class="w-10 mr-3" />
                <div>{skill.name}</div>
            </div>
			<Rating total={5} size={25} rating={skill.rate} />
		</div>
	{/each}
</div>
