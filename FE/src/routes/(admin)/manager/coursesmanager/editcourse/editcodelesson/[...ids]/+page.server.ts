import { getModCourseById, getModPraticeQuestionById } from "$lib/services/ModerationServices";

export async function load({ params }: any) {
    const ids = params.ids.split('/');
    const courseId = ids[0]
    const codelessonId = ids[1]
    const promise = async () => {
        const codelesson = await getModPraticeQuestionById(codelessonId)
        const course = await getModCourseById(courseId)
        return {
            course,
            codelesson
        }
    }

    return {
        promise: promise()
    }
}
