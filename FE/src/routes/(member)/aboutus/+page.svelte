<script>
	import bigLogBlack from '../../../assets/Trắng 1.png';
    import techimg3 from '../../../assets/techimg3.png';
	import { teammates } from '../../../data/data';
	import { t } from '../../../translations/i18n';
</script>

<div class="bg-blue-950 text-white">
	<img alt="blb" class="m-auto w-3/6" src={bigLogBlack} />

	<div class="italic uppercase text-3xl font-bold ml-16 mr-52 tracking-wide text-wrap leading-loose">
		<!-- The technology project was carried out by a team of five people 

from FPT University -->
{$t('The technology project was carried out by a team of five people from FPT University')}
	</div>

	<div class="text-center text-4xl font-extrabold mt-20 mb-10">{$t('Teams')}</div>
	<div class="flex items-center justify-around">
		{#each teammates as dev}
			<div class="w-1/5 p-5 text-center text-2xl font-semibold font-mono">
				<a href={dev.facebook} target="”_blank”">
					<img class="rounded-full w-full mb-5" alt="teamate" src={dev.image} />
					<div class="mb-2">{dev.name}</div>
					<div class="uppercase text-lg mb-2">{dev.position}</div>
					<div class="text-sm">{dev.email}</div>
				</a>
			</div>
		{/each}
	</div>
	<div class="flex items-center mt-20">
		<div class="w-2/4 py-5 relative">
			<img alt="ti" class="w-full" src={techimg3} />
		</div>
		<div class="w-2/4 whitespace-pre font-medium text-wrap leading-10 py-10 px-10">
            <!-- Nowadays, with easy and fast access to the Internet, and Vietnam being in the 4th industrial revolution, accessing programming learning has become easier than ever. Although learning programming has become easier, there are still difficulties that a new programmer must face:
            
            One of the important challenges is information overload: The Internet offers learners many learning resources, from instructional videos on YouTube, and books, to online courses. However, this causes learners to feel lost and not know where to start, directly reducing the ability of new learners to learn.
             
            Thinking and problem-solving skills: For beginners, it is easy to focus on learning languages, frameworks, or libraries but they forget to practise thinking and problem-solving. This requires creativity and logical thinking, which not everyone can easily develop.
          
            The system was created to make learning programming easier for beginners by helping learners have a clear direction, training their problem-solving thinking ability after each lesson, and motivating them.  -->
          {$t('Nowadays, with easy and fast access to the Internet, and Vietnam being in the 4th industrial revolution, accessing programming learning has become easier than ever. Although learning programming has become easier, there are still difficulties that a new programmer must face: One of the important challenges is information overload: The Internet offers learners many learning resources, from instructional videos on YouTube, and books, to online courses. However, this causes learners to feel lost and not know where to start, directly reducing the ability of new learners to learn. Thinking and problem-solving skills: For beginners, it is easy to focus on learning languages, frameworks, or libraries but they forget to practise thinking and problem-solving. This requires creativity and logical thinking, which not everyone can easily develop. The system was created to make learning programming easier for beginners by helping learners have a clear direction, training their problem-solving thinking ability after each lesson, and motivating them. ')}
		</div>
	</div>
</div>
