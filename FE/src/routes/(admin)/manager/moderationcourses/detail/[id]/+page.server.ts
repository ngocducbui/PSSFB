import { getModCourseById } from "$lib/services/ModerationServices"

export async function load ({params}:any) {
    const id = params.id
    const course = await getModCourseById(id)
    return {
        course
    }
}