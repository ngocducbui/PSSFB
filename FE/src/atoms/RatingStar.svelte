<script lang="ts">
	export let rating = 0;
	export let size = 16;
	let width: number = size;
	let height: number = size;
	const fullStar =
		'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z';
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	('M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z');
	const emptyStar =
		'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z';
</script>

<div>
	<div class="grid w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
		<div class="inline-flex items-center">
			<button disabled={true} on:click={() => (rating = 1)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill={rating >= 1 ? 'currentColor' : 'none'}
					stroke="currentColor"
					stroke-width="1.5"
					class="w-[{width}px] h-[{height}px] {rating >= 1 ? 'text-yellow-300' : ''} cursor-pointer"
				>
					<path fill-rule="evenodd" d={rating >= 1 ? fullStar : emptyStar} clip-rule="evenodd"
					></path>
				</svg></button
			><button disabled={true} on:click={() => (rating = 2)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill={rating >= 2 ? 'currentColor' : 'none'}
					stroke="currentColor"
					stroke-width="1.5"
					class="w-[{width}px] h-[{height}px] {rating >= 2 ? 'text-yellow-300' : ''} cursor-pointer"
				>
					<path fill-rule="evenodd" d={rating >= 2 ? fullStar : emptyStar} clip-rule="evenodd"
					></path>
				</svg></button
			><button disabled={true} on:click={() => (rating = 3)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill={rating >= 3 ? 'currentColor' : 'none'}
					stroke="currentColor"
					stroke-width="1.5"
					class="w-[{width}px] h-[{height}px] {rating >= 3 ? 'text-yellow-300' : ''} cursor-pointer"
				>
					<path fill-rule="evenodd" d={rating >= 3 ? fullStar : emptyStar} clip-rule="evenodd"
					></path>
				</svg></button
			><button disabled={true} on:click={() => (rating = 4)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill={rating >= 4 ? 'currentColor' : 'none'}
					stroke="currentColor"
					stroke-width="1.5"
					class="w-[{width}px] h-[{height}px] {rating >= 4 ? 'text-yellow-300' : ''} cursor-pointer"
				>
					<path fill-rule="evenodd" d={rating >= 4 ? fullStar : emptyStar} clip-rule="evenodd"
					></path>
				</svg></button
			><button disabled={true} on:click={() => (rating = 5)}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill={rating >= 5 ? 'currentColor' : 'none'}
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					class="w-[{width}px] h-[{height}px] {rating >= 5 ? 'text-yellow-300' : ''} cursor-pointer"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d={rating >= 5 ? fullStar : emptyStar}
					>
					</path>
				</svg></button
			>
		</div>
	</div>
</div>
