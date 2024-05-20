import { getCommentByPost, postComment, postReplyComment } from "$lib/services/CommentService";
import { getPostById } from "$lib/services/ForumsServices";
import { get } from "svelte/store";
import { currentUser } from "../../../../stores/store";
import { checkExist } from "../../../../helpers/helpers";
import { redirect } from "@sveltejs/kit";

export async function load({params}:any){
    const id = params.id;
    const post = await getPostById(id);
    const comments = await getCommentByPost(id)
    return {
        post,
        comments
    }
}

export const actions = {
    postcomment:async({cookies, request, params}:any)=>{
        const userStr = cookies.get('user');
        if(!checkExist(userStr)){
            redirect(301, "/")
        }
        const user = JSON.parse(userStr);
       
        
        const data:any = await request.formData();
        const postId = params.id;
        const content = data.get('content');
        if(checkExist(postId)&&checkExist(content)){
            await postComment({forumPostId: postId, commentContent: content, date: new Date().toISOString, userId: user.UserID})
        }
       
    },

    postreply:async({cookies, request}:any)=>{
        const userStr = cookies.get('user');
        if(!checkExist(userStr)){
            redirect(301, "/")
        }
        const user = JSON.parse(userStr);
       
        const data:any = await request.formData();
        const commentId = data.get('commentId');
        const content = data.get('content');
        if(checkExist(commentId)&&checkExist(content)){
            await postReplyComment({commentId: commentId, replyContent: content, date: new Date().toISOString, userId: user.UserID})
        }
       
    },

}