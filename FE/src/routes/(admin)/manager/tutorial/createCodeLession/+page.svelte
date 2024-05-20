<script>
	import { t } from '../../../../../translations/i18n';
	import codeform from '../../../../../assets/codeform.png';
	import testcase from '../../../../../assets/testcase.png';
	import edito1 from '../../../../../assets/editro1.png';
	import edito2 from '../../../../../assets/edito2.png';
</script>

<div>
	<div class="text-center font-bold text-4xl mb-10">{$t('How to create a practice lesson')}</div>
	<div class="text-2xl font-semibold">{$t('Create your your code form')}</div>
	<div class="text-sm my-2">
		{$t(
			'Remember, code form is what will first appear at user editor when enter a practice lesson'
		)}
	</div>
	<div class="text-sm my-2">
		{$t('Remember the answer function name later to create your test case')}
	</div>
	<div class="w-2/3 my-10"><img src={codeform} alt="codeform" /></div>
	<div class="text-2xl font-semibold">{$t('Create your your test case')}</div>
	<div class="text-sm my-2">
		{$t(
			'Your test case function should be named "TestCase" for our system to work properly, your test case will call the function assertEqual'
		)}
	</div>
	<div class="text-sm my-2">
		{$t(
			'The function assertEqual has 3 params, the first is your expected result of the test case, the second params is your answer function with params and the third params is the string type of tell us about your input'
		)}
	</div>
	<div class="text-sm my-2">{$t('Call the function assertEqual for each of your testcase')}</div>
	<div class="w-2/3 my-10"><img src={testcase} alt="testcase" /></div>
	<div class="text-sm my-2">{$t('Example:')}</div>
	<div class="w-2/3 my-10"><img src={edito1} alt="edito1" /></div>
	<div class="w-2/3 my-10"><img src={edito2} alt="edito2" /></div>
	<div class="text-2xl font-semibold">{$t('That is!')}</div>
</div>
