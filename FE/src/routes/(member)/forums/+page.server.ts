import { getAllPost } from "$lib/services/ForumsServices";

export async function load(){
    const promise = getAllPost()
    return {
        promise
    }
}


