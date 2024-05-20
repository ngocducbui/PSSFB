import axios from 'axios';
import { checkExist, showToast } from '../../helpers/helpers';

export const getAllCourses = async (
	tag = "All",
	courseName: string = '',
	page: number = 1,
	pageSize: number = 4,
	userId: number | undefined = undefined

) => {
	const string = `https://coursesservices.azurewebsites.net/api/Course/GetAllCourses?Page=${page}&PageSize=${pageSize}${checkExist(courseName) ? `&CourseName=${courseName}` : ``}${tag == "All" ? `` : `&Tag=${tag}`}${userId ? `&UserId=${userId}` : ``}`
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetAllCourses?Page=${page}&PageSize=${pageSize}${checkExist(courseName) ? `&CourseName=${courseName}` : ``}${tag == "All" ? `` : `&Tag=${tag}`}${userId ? `&UserId=${userId}` : ``}`
	);
	console.log(string);
	return result.data.value;
};

export const getCourseById = async (id: number, userId: number | undefined = undefined) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetCourseByCourseId?Id=${id}${userId ? `&userId=${userId}` : ``}`
	);
	return result.data.value;
};

export const getStudyingCourseByUserId = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetCourseByCourseId?Id=${id}`
	);
	return result.data.value;
};

export const getCompleteCourseByUserId = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetCourseByCourseId?Id=${id}`
	);
	return result.data.value;
};

export const getlessonById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetLessonById?lessonId=${id}`
	);
	return result.data.value;
};

export const getPraticeQuestionById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetPracticeQuestionById?practiceQuestionId=${id}`
	);
	return result.data.value;
};

export const getChapterById = async (id: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Course/GetChapterById?chapterId=${id}`
	);
	return result.data.value;
};

export const getNotes = async (userId: number, lessonId: number) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/Note/GetAllNoteOfUser?userId=${userId}&lessonId=${lessonId}`
	);
	return result.data.value;
};

export const addNote = async (Note: any) => {
	try {
		const result = await axios.post(
			`https://coursesservices.azurewebsites.net/api/Note/CreateNote`, Note
		);
		return result.data;
	} catch (error) {
		console.log(error);
		return error
	}

};

export const putNote = async (id: number, Note: any) => {
	try {
		const result = await axios.put(
			`https://coursesservices.azurewebsites.net/api/Note/UpdateNote?id=${id}`, Note
		);
		return result.data;
	} catch (error) {
		console.log(error);
		return error
	}
};

export const delNotes = async (id: number) => {
	try {
		const result = await axios.delete(
			`https://coursesservices.azurewebsites.net/api/Note/DeleteNote?id=${id}`
		);
		return result.data;
	} catch (error) {
		console.log(error);
		return error
	}
};

export const getExam = async (id: number, userId: number | undefined = undefined) => {
	try {
		const result = await axios.get(`https://coursesservices.azurewebsites.net/api/Course/GetExamQuestionDetail?lastExamId=${id}${userId ? `&userId=${userId}` : ``}`)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}

export const submitExam = async (submitData: any) => {
	try {
		const result = await axios.post(`https://coursesservices.azurewebsites.net/api/CheckAnswer/SubmitLastExam`, submitData)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}

export const enroll = async (userId: number, courseId: number) => {
	try {
		const result = await axios.post(`https://coursesservices.azurewebsites.net/api/Enrollment/CreateEnrollment`, { courseId, userId })
		console.log(result.data)
		return result.data
	} catch (error) {
		console.log(error);
		return error
	}
}

export const getWishList = async (
	userId: number,
	tag = "All",
	courseName: string = '',
	page: number = 1,
	pageSize: number = 4,
) => {
	const result = await axios.get(
		`https://coursesservices.azurewebsites.net/api/WishList/GetWishListByUserId?UserId=${userId}&Page=${page}&PageSize=${pageSize}${checkExist(courseName) ? `&CourseName=${courseName}` : ``}${tag == "All" ? `` : `&Tag=${tag}`}`
	);
	return result.data.value;
};

export const addWishList = async (
	userId: number,
	courseId: number
) => {
	try {
		const result = await axios.post(
			`https://coursesservices.azurewebsites.net/api/WishList/AddToWishlist`, { courseId, userId }
		);
		console.log(result.data);
		return result.data;
	} catch (error) {
		console.log(error)
		return error
	}
};

export const removeWishList = async (
	wishlistId: number
) => {
	try {
		const result = await axios.delete(
			`https://coursesservices.azurewebsites.net/api/WishList/RemoveFromWishlist?wishlistId=${wishlistId}`
		);
		console.log(result.data);
		return result.data;
	} catch (error) {
		console.log(error)
		return error
	}
};

export const getProgressCourses = async (userId: number) => {
	const result = await axios.get(`https://coursesservices.azurewebsites.net/api/GetProgressCourse/GetProgress?userId=${userId}`)
	return result.data.value
}

export const getUserEvaluation = async (userId: number, courseId: number) => {
	const response = await axios.get(
		`https://coursesservices.azurewebsites.net/api/EvaluateCourse/GetRateOfUser?courseId=${courseId}&userId=${userId}`
	);
	return response.data;
}

export const getCourseAverageEvaluation = async (courseId: number) => {
	const response = await axios.get(
		`https://coursesservices.azurewebsites.net/api/EvaluateCourse/GetCourseAverageRating?courseId=${courseId}`
	);
	return response.data;
}

export const createUserEvaluation = async (userId: number, courseId: number, star: Number) => {
	const response = await axios.post(
		`https://coursesservices.azurewebsites.net/api/EvaluateCourse/AddCourseEvaluation`, {
		courseId: courseId,
		userId: userId,
		star: star
	}
	);
	return response.data;
}

export const completelesson = async (userId: number, lessonId: number) => {
	try {
		const result = await axios.post(`https://coursesservices.azurewebsites.net/api/Course/CompletedLesson?userId=${userId}&lessonId=${lessonId}`)
		return result.data;
	} catch (error) {
		console.log(error);
		return error
	}
}