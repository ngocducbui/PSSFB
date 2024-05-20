import { initializeApp, getApps } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	updatePassword,
	updateProfile,
	type User
} from 'firebase/auth';
import { checkExist } from './helpers/helpers';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

const firebaseConfig = {
	// apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
	// authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
	// projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
	// storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	// appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
	apiKey: 'AIzaSyBAbMlY7TXHk2lq5WzSm9T18Qz0_4OmfHk',
	authDomain: 'pssfb-13819.firebaseapp.com',
	projectId: 'pssfb-13819',
	storageBucket: 'pssfb-13819.appspot.com',
	messagingSenderId: '533098774925',
	appId: '1:533098774925:web:b4fea9894aa8d913f9bdc4'
};

// Initialize Firebase
let firebaseApp:any;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
}

const GoogleProvider = new GoogleAuthProvider();

const FacebookProvider = new FacebookAuthProvider();

// Auth
const firebaseAuth = getAuth(firebaseApp);

const storage = getStorage();

export async function uploadImage(image: any) {
	const imageStorageRef = ref(storage, `images/${image.path}`);
	await uploadBytes(imageStorageRef, image).then((snapshot) => {
		console.log('Uploaded a blob or file!');
		console.log(snapshot);
	});
}

export async function uploadVid(vid: any) {
	const videoStorageRef = ref(storage, `videos/${vid.path}`);
	await uploadBytes(videoStorageRef, vid).then((snapshot) => {
		console.log('Uploaded a vid!');
		console.log(snapshot);
	});
}

export async function getURL(imagePath: string) {
	let URL = '';
	await getDownloadURL(ref(storage, `images/${imagePath}`))
		.then((url) => {
			console.log(url);
			URL = url;
		})
		.catch((error) => {
			// Handle any errors
			console.log(error);
		});
	return URL;
}

export async function getVideoURL(videoPath: string) {
	let URL = '';
	await getDownloadURL(ref(storage, `videos/${videoPath}`))
		.then((url) => {
			console.log(url);
			URL = url;
		})
		.catch((error) => {
			// Handle any errors
			console.log(error);
		});
	return URL;
}

const loginWithFacebook = async () => {
	let user;
	await signInWithPopup(firebaseAuth, FacebookProvider)
		.then((result) => {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			const credential = FacebookAuthProvider.credentialFromResult(result);
			const accessToken = credential?.accessToken;
			user = result.user;
			console.log(result.user)

			// IdP data available using getAdditionalUserInfo(result)
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = FacebookAuthProvider.credentialFromError(error);
			console.log('error', errorMessage);
			console.log('credential', credential);
			// ...
			user = {
				errorMessage,
				type: 'error'
			};
		});

	return user;
};

const loginWithGoogle = async () => {
	let user;
	await signInWithPopup(firebaseAuth, GoogleProvider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			user = result.user;
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			console.log('error', errorMessage);
			user = {
				errorMessage,
				type: 'error'
			};
		});
	return user;
};


const registerWithEmailAndPsr = async (email: string, password: string, username: string) => {
	let user;
	try {
		const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
		// Signed up
		const userc = userCredential.user;

		// Set the username in the user's profile
		await updateProfile(userc, { displayName: username });
		user = userCredential.user;
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log('error', errorMessage);
		throw error; // Rethrow the error so the caller can handle it
	}
	return user;
};

const loginWithEmailAndPsr = async (email: string, password: string) => {
	let user;
	await signInWithEmailAndPassword(firebaseAuth, email, password)
		.then((userCredential) => {
			// Signed in
			user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('error', errorMessage);
		});
	return user;
};

export const deleteWithEmailAndPsr = async (email: string, password: string) => {
	await signInWithEmailAndPassword(firebaseAuth, email, password)
		.then((userCredential) => {
			// Signed in
			userCredential.user?.delete();
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('error', errorMessage);
		});
};

const logout = () => {
	firebaseAuth.signOut();
};

const resetPasswordWithEmail = async (email: string) => {
	await sendPasswordResetEmail(firebaseAuth, email)
		.then((data) => {
			console.log('password reset', data);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('error', errorMessage);
			// ..
		});
};

const changePasswordWithEmail = async (newPassword: string) => {
	const user: any = firebaseAuth.currentUser;
	if (checkExist(user)) {
		updatePassword(user, newPassword)
			.then((data) => {
				console.log('change password', data);
				logout();
			})
			.catch((error) => {
				const errorMessage = error.message;
				console.log('error', errorMessage);
			});
	}
};

export const SendEmailVer = async (user: any) => {
	sendEmailVerification(user)
		.then(() => {
			// Email verification sent!
			// ...
		})
		.catch((error) => {
			console.log('error', error);
		});
};



// export const changeUserInfo = async (uid:string, info:any) => {
// 	const db = getDatabase();
// 	 set(ref(db, 'users/' + uid), {
// 		...info
// 	  });
// };

export {
	loginWithGoogle,
	logout,
	loginWithFacebook,
	registerWithEmailAndPsr,
	loginWithEmailAndPsr,
	resetPasswordWithEmail,
	changePasswordWithEmail
};
