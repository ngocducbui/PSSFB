import { getPostById } from "$lib/services/ForumsServices"
import { getModPostById } from "$lib/services/ModerationServices"

export async function load({params}:any){
    const postId = params.id
    const post = await getModPostById(postId)
    return {
        post
    }
}