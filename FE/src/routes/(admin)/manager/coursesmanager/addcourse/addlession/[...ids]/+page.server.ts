import { getModCourseById } from "$lib/services/ModerationServices";

export async function load({params}:any){
    const ids = params.ids.split('/');
    const courseId = ids[0]
    const promise = getModCourseById(courseId)
    return {
        promise
    }
}