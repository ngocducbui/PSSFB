
import { getModPostById } from "$lib/services/ModerationServices";

export async function load({params}:any){
    const id = params.id;
    const post = await getModPostById(id);
    return {
        post,
    }
}

