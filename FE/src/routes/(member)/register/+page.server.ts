import { SignUp, loginByGoogle } from "$lib/services/AuthenticationServices";
import { SendEmailVer, registerWithEmailAndPsr } from "../../../firebase";
import { checkExist, decodeJWT, trimUserData } from "../../../helpers/helpers";

export const actions = {
    
    register: async ({ cookies, request }: any) => {
		const data = await request.formData();
		console.log(data);
		console.log('server register working');
		try {
			const user: any = await registerWithEmailAndPsr(
				data.get('Email'),
				data.get('Password'),
				data.get('Username')
			);
			console.log('user', user);
			if (checkExist(user)) {
				// SignUp({
				// 	userName: data.get('Username'),
				// 	password: data.get('Password'),
				// 	email: data.get('Email')
				// });
				SendEmailVer(user)
				const JWTFS = await loginByGoogle(user?.email, user?.photoURL, user?.displayName);
				console.log('JWTFS', JWTFS);
				const decodeData: any = await decodeJWT(JWTFS);
				console.log('decodeData', decodeData);
				user.UserID = decodeData.UserID;
				user.Role = decodeData?.Roles ?? 'Student';
				user.jwt = JWTFS;
				user.displayName = decodeData.UserName;
				// cookies.set('user', JSON.stringify(trimUserData(user)), {
				// 	path: '/',
				// 	httpOnly: true,
				// 	sameSite: 'strict',
				// 	maxAge: 60 * 5
				// });
				const trimUser = trimUserData(user)
				console.log('trimUser', trimUser);
				return {
					user: trimUser
				};
			}
		} catch (error: any) {
			console.log(error);
			return {
				error: error?.message,
				type: 'error'
			};
		}
	}
    
}