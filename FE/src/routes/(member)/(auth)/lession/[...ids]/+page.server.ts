export const ssr = false;
import { getCommentBylesson, postComment, postReplyComment } from "$lib/services/CommentService";
import { getChapterById, getCourseById, getlessonById, getNotes } from "$lib/services/CourseServices";
import { redirect } from "@sveltejs/kit";
import { courses, schedules } from "../../../../../data/data";
import { checkExist } from "../../../../../helpers/helpers";



export async function load({ cookies, params }: any) {
    // const userStr = cookies.get('user');
    // if(!checkExist(userStr)){
    //     redirect(301, "/")
    // }
    // const user = JSON.parse(userStr);
    const ids = params.ids.split('/');
    const chapterId = ids[1];
    const lessonId = ids[2]
    const chapter = await getChapterById(chapterId);
    const lesson = await getlessonById(lessonId);
    const comments = await getCommentBylesson(lessonId)
    //const notes = await getNotes(user.UserID, lessonId)
    return {
        chapter,
        lesson,
        comments,
        //notes
    }
}

export const actions = {
    postcomment: async ({ cookies, request, params }: any) => {
        const userStr = cookies.get('user');
        if (!checkExist(userStr)) {
            redirect(301, "/")
        }
        const user = JSON.parse(userStr);


        const data: any = await request.formData();
        const ids = params.ids.split('/');
        const lessonId = ids[2]
        const content = data.get('content');
        if (checkExist(lessonId) && checkExist(content)) {
            await postComment({ lessonId: lessonId, commentContent: content, date: new Date().toISOString, userId: user.UserID })
        }

    },

    postreply: async ({ cookies, request }: any) => {
        const userStr = cookies.get('user');
        if (!checkExist(userStr)) {
            redirect(301, "/")
        }
        const user = JSON.parse(userStr);

        const data: any = await request.formData();
        const commentId = data.get('commentId');
        const content = data.get('content');
        if (checkExist(commentId) && checkExist(content)) {
            await postReplyComment({ commentId: commentId, replyContent: content, date: new Date().toISOString, userId: user.UserID })
        }

    },
}