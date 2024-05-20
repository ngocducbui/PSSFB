import { getModCourseById, updateCourse } from "$lib/services/ModerationServices";
import { redirect } from "@sveltejs/kit";
import { checkExist, getFormData } from "../../../../../../helpers/helpers";

export async function load ({params}:any) {
    const id = params.id
    const promise =  getModCourseById(id)
    return {
        promise
    }
}

export const actions = {
	editcourse: async ({ cookies, request }: any) => {
		// const userSTR = cookies.get('user');
		// if (!checkExist(userSTR)) {
		// 	redirect(301, '/');
		// }
		// const user = JSON.parse(userSTR);
		const data = getFormData(await request.formData());
		
		
		try {
			const response = await updateCourse({ ...data });
			return {
				type: 'success',
				message: 'update course successfully',
				response: response
			};
		} catch (err) {
			return { type: 'error', message: 'something went wrong', error: err };
		}
	}
};