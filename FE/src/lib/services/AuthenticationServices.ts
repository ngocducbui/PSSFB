import axios from 'axios';

export const loginByGoogle = async (email: string, photoURL: string, userName: string) => {
	try {
		const data = { email, photoURL, userName };
		console.log(data);
		const result = await axios.post(
			`https://authenticateservice.azurewebsites.net/api/Authenticate/LoginGoogle`,
			data
		);
		console.log(result);
		return result.data.value.token;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const checkEmail = async (email: string) => {
	const result = await axios.post(
		`https://authenticateservice.azurewebsites.net/api/Authenticate/CheckEmailExist?email=${email}`
	);
	return result.data;
};

export const getUserInfo = async (id: number) => {
	const result = await axios.get(
		`https://authenticateservice.azurewebsites.net/api/Authenticate/GetUser?id=${id}`
	);

	return result.data;
};

export const updateUserInfo = async (id: number, info: any) => {
	try {
		const result = await axios.put(
			`https://authenticateservice.azurewebsites.net/api/Profile/UpdateProfile?id=${id}`, info
		);
		return result;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteUser = async (email: string) => {
	try {
		const result = await axios.delete(
			`https://authenticateservice.azurewebsites.net/api/Profile/DeleteUser?email=${email}`
		);
		result.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};


export const SignUp = async (data: any) => {
	try {
		await axios.post(`https://authenticateservice.azurewebsites.net/api/Authenticate/SignUp`)
	} catch (error) {
		console.log(error);
		return
	}
}

export const AddAdmin = async (data: any) => {
	try {
		const result = await axios.post(`https://authenticateservice.azurewebsites.net/api/Authenticate/CreateAdminBussiness`,data)
		return result.data
	} catch (error) {
		console.log(error);
		return
	}
}