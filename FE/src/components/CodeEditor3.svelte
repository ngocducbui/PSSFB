<script lang="ts">
	import Icon from '@iconify/svelte';
	import { codeLanguage } from '../data/data';
	//import 'codemirror/lib/codemirror.css';
	import Button2 from '../atoms/Button2.svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { python } from '@codemirror/lang-python';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { java } from '@codemirror/lang-java';
	import { cpp } from '@codemirror/lang-cpp';
	import { currentUser, pageStatus } from '../stores/store';
	import { C, CPlus, Java } from '$lib/constant';
	import { CEditor, CPlusEditor, JavaEditor } from '$lib/services/CompilerService';

	export let value = '';

	export let result: any = [];

	export let lang = 'Java';

	export let lessonId: any;

	$: getLang = () => {
		switch (lang) {
			case 'Java':
				value = Java;
				return java();
			case 'C':
				value = C;
				return cpp();
			case 'C++':
				value = CPlus;
				return cpp();
			default:
				value = Java;
				return java();
		}
	};

	const executeCode = async () => {
		pageStatus.set('load');
		switch (lang) {
			case 'Java':
				result = await JavaEditor({ lessonId, userCode: value, userId: $currentUser?.UserID });
				break;
			case 'C':
				result = await CEditor({ lessonId, userCode: value, userId: $currentUser?.UserID });
				break;
			case 'C++':
				result = await CPlusEditor({ lessonId, userCode: value, userId: $currentUser?.UserID });
				break;
		}

		console.log(result);
		pageStatus.set('done');
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
			<Button2 classes="bg-slate-500" content="submit" />
		</div>
	</div>
	<!-- <iframe id="editor" class="w-full h-[400px] overflow-visible" src="https://www.programiz.com/java-programming/online-compiler/?hideMenu=1&hideTabs=1"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; gyroscope; microphone; midi; network-state; picture-in-picture; speaker; sync-xhr; usb; vr; wake-lock;"
        allowfullscreen/> -->

	<!-- <textarea rows="14" class="bg-slate-950 text-base p-5 w-full"></textarea> -->

	<CodeMirror
		bind:value
		lang={getLang()}
		styles={{
			'&': {
				width: '100%',
				maxWidth: '100%',
				height: '300px'
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
