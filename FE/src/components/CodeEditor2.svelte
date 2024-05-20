<script lang="ts">
	import CodeMirror from "svelte-codemirror-editor";
	import {java} from "@codemirror/lang-java"
	import {cpp} from "@codemirror/lang-cpp"
	import { oneDark } from "@codemirror/theme-one-dark";

    export let value = "";
	export let readonly = false;
	export let lang = "Java"

	const getLang = () => {
		switch (lang){
			case "Java":
				return java();
			case "C":
				return cpp();
			case "C++":
				return cpp();
			default:
				return java();
		}
	}
	
</script>

<div class="text-slate-300">
	
		<CodeMirror lang={getLang()} readonly={readonly} bind:value styles={{
			"&": {
				width: "100%",
				maxWidth: "100%",
				height: "250px",
			},
		}} theme={oneDark}/>
	
	<div class="bg-slate-800 text-white resize p-5 font-medium">
		
		
	</div>
</div>
