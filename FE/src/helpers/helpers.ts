import { toasts, ToastContainer, FlatToast, BootstrapToast } from 'svelte-toasts';
import type { ToastType } from 'svelte-toasts/types/common';

export function secondsToHMS(seconds: number) {
	// Calculate hours, minutes, and remaining seconds
	var hours = Math.floor(seconds / 3600);
	var minutes = Math.floor((seconds % 3600) / 60);
	var remainingSeconds = seconds % 60;

	// Add leading zero if needed
	var hoursStr = hours < 10 ? '0' + hours : hours;
	var minutesStr = minutes < 10 ? '0' + minutes : minutes;
	var secondsStr = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

	// Combine the results into the "hh:mm:ss" format
	var timeString = hoursStr + ':' + minutesStr + ':' + secondsStr;

	return timeString;
}

export function checkExist(v: any) {
	return v != undefined && v != null && v != '';
}

export function checkNote(v: any) {
	return v.replace("&nbsp;","").trim() == "<p></p>";
}

export function showToast(title: string, description: string, type: ToastType = 'info') {
	const toast = toasts.add({
		title,
		description,
		duration: 5000, // 0 or negative to avoid auto-remove
		placement: 'top-right',
		type,
		onClick: () => { },
		onRemove: () => { }
		// component: BootstrapToast, // allows to override toast component/template per toast
	});

	// toast.remove()
}

export function isValidEmail(email: string) {
	// Regular expression pattern for validating email addresses
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}

export function decodeJWT(token: string) {
	try {
		console.log('token', token);
		const [header, payload, signature] = token.split('.');
		const decodedHeader = JSON.parse(atob(header));
		const decodedPayload = JSON.parse(atob(payload));
		console.log('decoded', decodedPayload);
		return decodedPayload;

	} catch (error: any) {
		console.error('Error decoding JWT:', error.message);
		return null;
	}
}

export function trimUserData(user: any) {
	const trimUser = {
		...user.providerData[0],
		UserID: user.UserID,
		Role: user.Role,
		jwt: user.jwt,
		//stsTokenManager: user.stsTokenManager,
		uid: user.uid,
		displayName: user.displayName,
		photoURL: user.photoURL
	};
	return trimUser;
}

export function getFormData(formData: any) {
	let data: any = {};
	// Iterate over FormData entries and populate the object
	for (let [key, value] of formData.entries()) {
		data[key] = value;
	}
	return data;
}

export function convertSecondsToMmSs(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	// Pad minutes and seconds with leading zeros if necessary
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = Math.floor(remainingSeconds).toString().padStart(2, "0");

	return `${formattedMinutes}:${formattedSeconds}`;
}


export function checkPasswords(password: string) {
	// Kiểm tra độ dài của mật khẩu
	if (!checkExist(password) || password.length < 8 || password.length > 32) {
		return false;
	}

	// Kiểm tra xem mật khẩu có chứa ít nhất một ký tự viết hoa và ít nhất một chữ số hay không
	let hasUpperCase = false;
	let hasNumber = false;
	let hasSpecialChar = false;
	for (let i = 0; i < password.length; i++) {
		const char = password[i];
		if (char >= 'A' && char <= 'Z') {
			hasUpperCase = true;
		} else if (!isNaN(parseInt(char))) {
			hasNumber = true;
		} else if (/[^A-Za-z0-9]/.test(char)) {
			hasSpecialChar = true;
		}
	}

	return hasUpperCase && hasNumber && hasSpecialChar;
}

export function checkUserName(userName: string): boolean {
	if (!checkExist(userName) || userName.length < 8 || userName.length > 32) {
		return false;
	}
	return true
}

export function checkTitle(title: string): boolean {
	if (title.length < 256) {
		return true;
	}
	return false
}

export function secondsToDateTime(seconds: number) {
	var date = new Date(seconds * 1000); // Convert seconds to milliseconds
	var day = ("0" + date.getDate()).slice(-2);
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var year = date.getFullYear();
	var hours = ("0" + date.getHours()).slice(-2);
	var minutes = ("0" + date.getMinutes()).slice(-2);

	return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
}

export function isImage(path: string) {
	if (
		path.includes('jpg') ||
		path.includes('jng') ||
		path.includes('gìf') ||
		path.includes('png') ||
		path.includes('svg')
	)
		return true;
	return false;
}

export function customIsNaN(value: any) {
	// Kiểm tra xem giá trị có phải NaN không bằng cách so sánh nó với chính nó
	// Vì NaN không bằng bất kỳ giá trị nào, kể cả chính nó, nên sẽ trả về true trong trường hợp này
	return value !== value;
}

export function checkNumber(input: any) {
	// Xóa các ký tự không phải số khỏi giá trị nhập vào
	input.value = input.value.replace(/[^0-9]/g, '');

	// Lấy giá trị số từ input
	var k = parseInt(input.value);

	// Kiểm tra xem k có phải là một số hợp lệ
	if (!customIsNaN(k)) {
		// Nếu k là một số hợp lệ, thay đổi giá trị của input
		input.value = k;
	} else {
		// Nếu k không phải là một số hợp lệ, xóa giá trị của input
		input.value = 0;
	}

	input.value = convertToVND(k);
}

export function convertToVND(number: number) {
	// Chuyển đổi số thành chuỗi và thêm dấu chấm phân tách hàng nghìn
	if (customIsNaN(number)) {
		number = 0;
	}
	var formattedNumber = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND'
	}).format(number);

	// Hiển thị giá trị đã được định dạng
	return formattedNumber;
}

export function convertVNDToNumber(vnd: any) {
	if (vnd != 0) {
		// Xóa các ký tự không phải số khỏi chuỗi VNĐ
		var cleanNumber = vnd.replace(/[₫.]/g, '');

		// Chuyển đổi chuỗi số thành một số nguyên
		var number = parseInt(cleanNumber.trim());

		// Hiển thị số nguyên đã chuyển đổi
		return number;
	}
}

export function isVND(string: string) {
	return string.includes('₫');
}

export function formatLongToDate(long: number) {
	// Create a new Date object from the milliseconds
	const date = new Date(long);

	// Extract year, month, day, hours, minutes, and seconds
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	// Format the date string
	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const handlePosetiveInput = (event: any) => {
	if (event.target.value < 1) {
		event.target.value = 1;
	}
}


