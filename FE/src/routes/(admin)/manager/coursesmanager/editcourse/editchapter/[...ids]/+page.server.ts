import { addChapter, getModChapterById, getModCourseById, updateChapter } from "$lib/services/ModerationServices"
import { getFormData } from "../../../../../../../helpers/helpers";

export async function load({params}:any){
	const ids = params.ids.split('/');
    const courseId = ids[0]
	const chapterId = ids[1]
	async function promise() {
		const chapter = await getModChapterById(chapterId)
		const course = await getModCourseById(courseId)
		return {
			course,
			chapter
		}
	}
	return {
		promise: promise()
	}
	
}

export const actions = {
	editchapter: async ({ params, request }: any) => {
		const data = getFormData(await request.formData());
		
		try {
			const response = await updateChapter({ ...data });
			console.log("response: ", response)
			return {
				type: 'success',
				message: 'edit chapter successfully',
				response: response
			};
		} catch (err) {
			console.error(err);
			return { type: 'error', message: 'something went wrong' };
		}
	}
};
