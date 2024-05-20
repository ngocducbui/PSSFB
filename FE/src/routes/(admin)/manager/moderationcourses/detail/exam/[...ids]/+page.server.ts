
import { getModChapterById, getModCourseById, getModExamById } from "$lib/services/ModerationServices"

export async function load({params}:any){
    const ids = params.ids.split("/")
    const courseId = ids[0]
    const examId = ids[1]
    const course = await getModCourseById(courseId)
    const exam = await getModExamById(examId)
    return {
        course,
        exam
    }
    
}