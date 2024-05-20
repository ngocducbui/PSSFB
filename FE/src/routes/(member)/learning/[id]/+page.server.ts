import { getCommentByCourse, postComment, postReplyComment } from '$lib/services/CommentService';
import { getCourseById } from '$lib/services/CourseServices';
import { redirect } from '@sveltejs/kit';
import { checkExist } from '../../../../helpers/helpers.js';
//import { courses, schedules, sysllabuses } from "../../../../../data/data";

export async function load({ params }: any) {
	// const id = params.id;
	// const promise = async ():Promise<any> => {
	// 	const course = await getCourseById(id);
	// 	const comments = await getCommentByCourse(id);
	// 	return {
	// 		course,
	// 		comments,
	// 	};
	// };

	// return {
	// 	promise: promise()
	// };
}

export const actions = {
	postcomment: async ({ cookies, request, params }: any) => {
		const userStr = cookies.get('user');
		if (!checkExist(userStr)) {
			redirect(301, '/');
		}
		const user = JSON.parse(userStr);

		const data: any = await request.formData();
		const courseId = params.id;
		const content = data.get('content');
		if (checkExist(courseId) && checkExist(content)) {
			await postComment({
				courseId,
				commentContent: content,
				date: new Date().toISOString,
				userId: user.UserID
			});
		}
	},

	postreply: async ({ cookies, request }: any) => {
		const userStr = cookies.get('user');
		if (!checkExist(userStr)) {
			redirect(301, '/');
		}
		const user = JSON.parse(userStr);

		const data: any = await request.formData();
		const commentId = data.get('commentId');
		const content = data.get('content');
		if (checkExist(commentId) && checkExist(content)) {
			await postReplyComment({
				commentId: commentId,
				replyContent: content,
				date: new Date().toISOString,
				userId: user.UserID
			});
		}
	}
};
