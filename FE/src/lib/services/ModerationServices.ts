import axios from 'axios';
import { checkExist } from '../../helpers/helpers';
import { MorderationPostManager } from '../../Enum/Paginators';


export const getAllPendingPostByUserId = async (userId: number | undefined = undefined, posttitle: string = '',
	page: number = 1,
	pageSize: number = 10) => {
	const result = await axios.get(`https://moderationservice.azurewebsites.net/api/Post/GetPostsByUserId?${userId ? `userId=${userId}&` : ``}page=${page}&pageSize=${pageSize}${checkExist(posttitle) ? `&postTitle=${posttitle}` : ``}`)
	return result.data
}

export const addCourse = async (course: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/CourseModeration/AddCourse`,
			course
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
}

export const addChapter = async (chapter: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/ChapterModeration/AddChapter`,
			chapter
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const addlesson = async (lesson: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/LessonModeration/CreateLesson`,
			lesson
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const addCodeQuestion = async (codeques: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/PracticeQuestion/CreatePracticeQuestion`,
			codeques
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const addExam = async (exam: any) => {
	try {
		const result = await axios.post(
			`https://moderationservice.azurewebsites.net/api/LastExam/CreateLastExam`,
			exam
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updateCourse = async (course: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/CourseModeration/UpdateCourse`,
			course
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
}

export const updateChapter = async (chapter: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/ChapterModeration/UpdateChapter?id=${chapter.id}`,
			chapter
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updatelesson = async (lesson: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/LessonModeration/UpdateLesson?id=${lesson.lessonId}`,
			lesson
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updateCodeQuestion = async (codeques: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/PracticeQuestion/UpdatePracticeQuestion?id=${codeques.practiceQuestionId}`,
			codeques
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const updateExam = async (exam: any) => {
	try {
		const result = await axios.put(
			`https://moderationservice.azurewebsites.net/api/LastExam/UpdateLastExam?id=${exam.lastExamId}`,
			exam
		);
		return result.data.value;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteCourse = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/CourseModeration/DeleteCourse?courseId=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
}

export const deleteChapter = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/ChapterModeration/DeleteChapter?id=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deletelesson = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/LessonModeration/DeleteLesson?id=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteCodeQuestion = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://moderationservice.azurewebsites.net/api/PracticeQuestion/DeletePracticeQuestion?id=${id}`
		);
		return result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getCreatingCourseByUser = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/CourseModeration/GetCourseByUserId?userId=${id}`
	);
	return result.data.value;
};

export const getAllModCourse = async (tag: string = "All", courseName: string = "", page: number = 1, pageSize: number = 6) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationsCourse?${checkExist(courseName) ? `courseName=${courseName}&` : ``}${tag == "All" ? `` : `Tag=${tag}&`}page=${page}&pageSize=${pageSize}`
	);
	return result.data.value;
};

export const getModCourseById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationCourseById?courseId=${id}`
	);
	return result.data;
};

export const getAllModPosts = async (param: any) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/Moderation/GetModerationsPost${(param.postTitle !== '' ? "?postTitle=" + param.postTitle + "&" : "?")}page=${(param.pageNumber ? param.pageNumber : "1")}&pageSize=${(param.pageSize ? param.pageSize : MorderationPostManager.PageSize)}${param.tag !== '' ? "&Tag=" + param.tag : ""}`
	);
	return result.data.value;
};

export const getModPostById = async (id: number) => {
	const result = await axios.get(`https://moderationservice.azurewebsites.net/api/Post/GetPostById?postId=${id}`)
	return result.data.value
}

export const approvedPost = async (id: number) => {
	const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/ModerationPost?postId=${id}`)
	return result.data.value
}

export const rejectPost = async (postId: number, reasonWhyReject: string) => {
	const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/RejectPost`, {
		postId: postId,
		reasonWhyReject: reasonWhyReject
	})
	return result.data.value
}

export const getModChapterById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/ChapterModeration/GetChapterById?id=${id}`
	);

	return result.data.value
}

export const getModlessonById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/LessonModeration/GetLessonById?id=${id}`,
	);

	return result.data.value
}

export const getModPraticeQuestionById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/PracticeQuestion/GetPracticeQuestionById?id=${id}`
	);
	return result.data.value
}

export const getModExamById = async (id: number) => {
	const result = await axios.get(
		`https://moderationservice.azurewebsites.net/api/LastExam/GetLastExamById?id=${id}`
	);
	return result.data.value
}

export const approvePost = async (postId: number) => {
	try {
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/ModerationPost?postId=${postId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const deleteModPost = async (postId: number) => {
	try {
		const result = await axios.delete(`https://moderationservice.azurewebsites.net/api/Post/DeletePost?postId=${postId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const deleteModCourse = async (courseId: number) => {
	try {
		const result = await axios.delete(`https://moderationservice.azurewebsites.net/api/CourseModeration/DeleteCourse?courseId=${courseId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const deleteModExam = async (examId: number) => {
	try {
		const result = await axios.delete(`https://moderationservice.azurewebsites.net/api/LastExam/DeleteLastExam?id=${examId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const approveCourse = async (courseId: number) => {
	try {
		console.log(courseId)
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/ModerationCourse?courseId=${courseId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const reject = async (data: any) => {
	try {
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/Reject`, data)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const sendCourseToApprove = async (courseId: number) => {
	try {
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/SendToModeration?CourseId=${courseId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const createPost = async (post: any) => {
	try {
		const result = await axios.post('https://moderationservice.azurewebsites.net/api/Post/CreatePost', post)
		return result.data.value
	} catch (error) {
		console.log(error);
		return error
	}
}

// export const deleteModPost = async (postId:number) => {
// 	try {
// 		const result = await axios.post('https://moderationservice.azurewebsites.net/api/Moderation/CreatePost',post)
// 		return result.data
// 	} catch (error) {
// 		console.log(error);
// 		return error
// 	}
// }

export const updateModPost = async (post: any) => {
	try {
		const result = await axios.put(`https://moderationservice.azurewebsites.net/api/Post/UpdatePost?id=${post.id}`, post)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}

export const sendPostToModeration = async (postId: number) => {
	try {
		const result = await axios.post(`https://moderationservice.azurewebsites.net/api/Moderation/SendPostToModeration?PostId=${postId}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}


export const changeStatus = async (userId: number, uid: string) => {
	try {
		const result = await axios.put(`https://authenticateservice.azurewebsites.net/api/Authenticate/ChangeStatus?userId=${userId}&UIdFireBase=${uid}`)
		return result.data
	} catch (error) {
		console.log(error)
		return error
	}
}