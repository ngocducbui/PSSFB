<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { java } from '@codemirror/lang-java';
	import { cpp } from '@codemirror/lang-cpp';
	import { oneDark } from '@codemirror/theme-one-dark';
	import Icon from '@iconify/svelte';
	import Button2 from '../atoms/Button2.svelte';
	import { pageStatus } from '../stores/store';

	export let value = '';
	export let readonly = false;
	export let lang = 'Java';
	export let result = ""

	const getLang = () => {
		switch (lang) {
			case 'Java':
				return java();
			case 'C':
				return cpp();
			case 'C++':
				return cpp();
			default:
				return java();
		}
	};

	export let executeCode = async () => {
		
	};
</script>

<div class="text-slate-300">

	<div class="flex justify-between items-center bg-slate-800 p-5">
		<div class="flex items-center">
			<Icon icon="" />
			<select bind:value={lang} class="bg-slate-800">
				<option>Java</option>
				<option>C</option>
				<option>C++</option>
			</select>
		</div>
		<div>
			<Button2 onclick={executeCode} classes="bg-blue-800" content="run code" />
		</div>
	</div>

	<CodeMirror
		lang={getLang()}
		{readonly}
		bind:value
		styles={{
			'&': {
				width: '100%',
				maxWidth: '100%',
				height: '250px'
			}
		}}
		theme={oneDark}
	/>

	<div class="bg-slate-800 text-white resize p-5 font-medium">
		<div class="border-b border-white inline-block mb-3">TEST CASE</div>
		<div class="flex min-h-40">
			<div class="w-1/6 border-r mr-10">
				<div>Result:</div>
				<!-- {#each result as tc, index}
					<button on:click={() => selectIndex=index} class="w-full {selectIndex==index?"bg-blue-900":""}">Test case {index + 1}</button>
				{/each} -->
			</div>
			<div class="w-5/6 flex">
				<!-- {#if result?.length > 0}
					<div class="w-1/2">
						<div>Expected Result: </div>
						<div>Actual Result: </div>
						<div>Test Result: </div>
					</div>
					<div class="w-1/2">
						<div>{result[selectIndex]?.expected??""}</div>
						<div>{result[selectIndex]?.actual??""}</div>
						<div class="{result[selectIndex]?.result=="Passed"?"text-lime-600":"text-red-600"}">{result[selectIndex]?.result??""}</div>
					</div>
				{/if} -->
				<div class="w-1/2">
					<div>{result}</div>
				</div>
			</div>
		</div>
	</div>
</div>
