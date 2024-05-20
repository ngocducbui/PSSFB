import { getModChapterById, getModCourseById } from "$lib/services/ModerationServices"

export async function load({params}:any){
	const ids = params.ids.split('/');
    const courseId = ids[0]
	const chapterId = ids[1]
	const chapter = await getModChapterById(chapterId)
    const course = await getModCourseById(courseId)
    return {
        course,
		chapter
    }
}