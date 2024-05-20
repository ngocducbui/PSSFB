import { getModChapterById, getModCourseById } from "$lib/services/ModerationServices"



export async function load({params}:any){
    const ids = params.ids.split("/")
    const courseId = ids[0]
    const promise = async() => {
        const course = await getModCourseById(courseId)
        return {
            course
        }
    }

    return {
        promise: promise()
    }
    
}