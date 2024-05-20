import { getModCourseById, getModlessonById } from "$lib/services/ModerationServices";

export async function load({ params }: any) {
    const ids = params.ids.split('/');
    const courseId = ids[0]
    const lessonId = ids[1]
    const course = await getModCourseById(courseId)
    const lesson = await getModlessonById(lessonId)
    return {
        course,
        lesson
    }
}