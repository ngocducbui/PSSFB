import { addChapter, getModCourseById } from "$lib/services/ModerationServices"
import { getFormData } from "../../../../../../../helpers/helpers";

export async function load({params}:any){
    const courseId = params.id
    const promise = getModCourseById(courseId)
    return {
        promise
    }
}

export const actions = {
	addchapter: async ({ params, request }: any) => {
		const data = getFormData(await request.formData());
		
		const courseId = params.id
		try {
			const response = await addChapter({ ...data, courseId });
			console.log("response: ", response)
			return {
				type: 'success',
				message: 'add chapter successfully',
				response: response
			};
		} catch (err) {
			console.error(err);
			return { type: 'error', message: 'something went wrong' };
		}
	}
};
