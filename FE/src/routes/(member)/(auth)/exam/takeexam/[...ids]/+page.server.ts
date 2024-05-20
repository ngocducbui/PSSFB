const ssr = false;
import { getExam } from "$lib/services/CourseServices";

export async function load({params}:any){
    const ids = params.ids.split('/')
    const courseId = ids[0];
    const chapterId = ids[1];
    const examId = ids[2];
    const exam = await getExam(examId)
    console.log(exam)
    return {
        exam,
        courseId,
        chapterId
    }
}