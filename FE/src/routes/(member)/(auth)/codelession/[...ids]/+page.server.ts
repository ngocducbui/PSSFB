import { getChapterById, getCourseById, getPraticeQuestionById } from "$lib/services/CourseServices";
import { courses, schedules } from "../../../../../data/data";



export async function load({params}:any) {
    const ids = params.ids.split('/');
    const chapterId = ids[1];
    const practiceQuestionId = ids[2];
    const chapter = await getChapterById(chapterId);
    const practiceQuestion = await getPraticeQuestionById(practiceQuestionId)
    return {
        chapter,
        practiceQuestion
    }
}