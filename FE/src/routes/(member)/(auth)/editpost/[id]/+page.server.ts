import { getPostById } from "$lib/services/ForumsServices"

export async function load({params}:any){
    const postId = params.id
    const post = await getPostById(postId)
    return {
        post
    }
}