import Thanh from '../assets/Thanh.jpg';
import Binh from '../assets/binh.jpg';
import Hoang from '../assets/Hoang.jpg';
import Duc from '../assets/Duc.jpg';
import Chien from '../assets/Chien.jpg';

interface section {
	display: string;
	link: string;
}

interface dev {
	image: any;
	name: string;
	email: string;
	facebook: string;
	position: string;
}

export const headerData: section[] = [
	{ display: 'Learning', link: '/learning' },
	{ display: 'Forums', link: '/forums' },
	{ display: 'About Us', link: '/aboutus' }
];

export const headerAdminData: section[] = [
	{ display: 'Manager', link: '/manager' },
	{ display: 'Forums', link: '/forums' },
	{ display: 'About Us', link: '/aboutus' }
];

export const teammates: dev[] = [
	{
		image: Thanh,
		name: 'Nguyen Cong Thanh',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'front-end devloper'
	},
	{
		image: Duc,
		name: 'Bui Nguyen Ngoc Duc',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'tester'
	},
	{
		image: Binh,
		name: 'Pham Hai Binh',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'backend developer'
	},
	{
		image: Hoang,
		name: 'Nguyen Huy Hoang',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'leader'
	},
	{
		image: Chien,
		name: 'Ha Viet Chien',
		email: 'nguyenthanh231202@gmail.com',
		facebook: 'https://www.facebook.com/Thanh2377',
		position: 'backend developer'
	}
];

export const sysllabuses = [
	[
		{
			type: 'quiz',
			name: 'Data Type In C'
		},
		{
			type: 'code',
			name: 'basic C exercise: print'
		},
		{
			type: 'code',
			name: 'first C program: array'
		},
		{
			type: 'code',
			name: 'first C program: string'
		}
	],
	[
		{
			type: 'quiz',
			name: 'Data Type In JavaScript'
		},
		{
			type: 'code',
			name: 'basic JavaScript exercise: print'
		},
		{
			type: 'code',
			name: 'first JavaScript program: array'
		},
		{
			type: 'code',
			name: 'first JavaScript program: string'
		}
	],
	[
		{
			type: 'quiz',
			name: 'Data Type In C++'
		},
		{
			type: 'code',
			name: 'basic C++ exercise: print'
		},
		{
			type: 'code',
			name: 'first C++ program: array'
		},
		{
			type: 'code',
			name: 'first C++ program: string'
		}
	],
	[
		{
			type: 'quiz',
			name: 'Data Type In Python'
		},
		{
			type: 'code',
			name: 'basic Python exercise: print'
		},
		{
			type: 'code',
			name: 'first Python program: array'
		},
		{
			type: 'code',
			name: 'first Python program: string'
		}
	]
];
export const courses = [
	{
		title: 'C++ for Beginners',
		description:
			'The complete C++ Programing Course for Beginners, this course teaches you the fundamentals of a programing language. After completed, you will be able to move from the basics to more advanced course.',
		image:
			'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/bf4dca390c5742bda4dbf6344e859eb9.jpg',
		estimateTime: 72000,
		author: 'Steven Siren'
	},
	{
		title: 'Javascript basics',
		description:
			'Help students master the basic fundamental and syntax in Javascript - the most popular programming language in the world.',
		image:
			'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/8c4eed15a33744e996461692464ebc7f.jpg',
		estimateTime: 93600,
		author: 'Steven Siren'
	},
	{
		title: 'Advance C++',
		description:
			'The complete C++ Programing Course for Beginners, this course teaches you the fundamentals of a programing language. After completed, you will be able to move from the basics to more advanced course.',
		image:
			'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/37a8e25c3ada4cb0bc3b0b32a36881fe.jpg',
		estimateTime: 72000,
		author: 'Steven Siren'
	},
	{
		title: 'Python fundamentals',
		description:
			'This course was created for complete beginners and will teach you programming fundamentals in a Python. Learn python programming fundamentals and build your first project from start to finish.',
		image:
			'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/Course/cf55489ccd434e8c81c61e6fffc9433f.jpg',
		estimateTime: 93600,
		author: 'Steven Siren'
	}
];

export const posts = [
	{
		image:
			'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/c4576cce3c7d44c2af2c65a42636faff.jpg',
		title: 'Nurture Your Software DNA_Mini code challenge',
		content: 'Nurture Your Software DNA_Mini code challenge',
		comment: '47',
		createdDate: '07-11-2023'
	},
	{
		image:
			'https://codelearnstorage.s3.amazonaws.com/CodeCamp/CodeCamp/Upload/34f5b8da9011429faf9e08ab7be4fd52.png',
		title: 'FPT TECHDAY 2021_CODE WARS: VÒNG ĐẤU TỰ DO - 03/12/2021',
		content:
			' Bảng thi giành cho mọi đối tượng đam mê lập trình, yêu thích công nghệ \n Đăng ký tham gia vui lòng truy cập: https://techday2021.fpt.com.vn/vi/code-war',
		comment: '305',
		createdDate: '03-12-2021'
	}
];

export const skills = [
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Java.svg',
		name: 'java',
		rate: 4
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/C.svg',
		name: 'C',
		rate: 4.2
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Cplus.svg',
		name: 'C++',
		rate: 3.4
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Python.svg',
		name: 'Python',
		rate: 2
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Csharp.svg',
		name: 'C#',
		rate: 3.7
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/Go.svg',
		name: 'Go',
		rate: 4.1
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/JS.svg',
		name: 'javascript',
		rate: 3.2
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/mysql.svg',
		name: 'MySQL',
		rate: 4
	},
	{
		icon: 'https://codelearnstorage.s3.amazonaws.com/Themes/TheCodeCampPro/Resources/Images/assets/languages/postgresql.svg',
		name: 'Postgresql',
		rate: 5
	}
];

export const comment = [
	{
		username: 'John Doe',
		date: '2024-02-10',
		content: 'bài học hay quá, cảm ơn admin',
		like: 2
	},
	{
		username: 'David',
		date: '2024-02-10',
		content: 'đã hoàn thành bài học',
		like: 3
	},
	{
		username: 'Marry',
		date: '2024-02-10',
		content: 'tiếp theo tôi nên học gì',
		like: 5
	}
];

export const schedules = [
	[
		{
			name: 'First C Program',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In C'
				},
				{
					type: 'code',
					name: 'basic C exercise: print'
				},
				{
					type: 'code',
					name: 'first C program: array'
				},
				{
					type: 'code',
					name: 'first C program: string'
				}
			]
		},
		{
			name: 'Basic C',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In C'
				},
				{
					type: 'code',
					name: 'basic C exercise: print'
				},
				{
					type: 'code',
					name: 'first C program: array'
				},
				{
					type: 'code',
					name: 'first C program: string'
				}
			]
		},
		{
			name: 'Advance C',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In C'
				},
				{
					type: 'code',
					name: 'basic C exercise: print'
				},
				{
					type: 'code',
					name: 'first C program: array'
				},
				{
					type: 'code',
					name: 'first C program: string'
				}
			]
		}
	],
	[
		{
			name: 'First JavaScript Program',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In JavaScript'
				},
				{
					type: 'code',
					name: 'basic JavaScript exercise: print'
				},
				{
					type: 'code',
					name: 'first JavaScript program: array'
				},
				{
					type: 'code',
					name: 'first JavaScript program: string'
				}
			]
		},
		{
			name: 'Basic C',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In JavaScript'
				},
				{
					type: 'code',
					name: 'basic JavaScript exercise: print'
				},
				{
					type: 'code',
					name: 'first JavaScript program: array'
				},
				{
					type: 'code',
					name: 'first JavaScript program: string'
				}
			]
		},
		{
			name: 'Advance JavaScript',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In JavaScript'
				},
				{
					type: 'code',
					name: 'basic JavaScript exercise: print'
				},
				{
					type: 'code',
					name: 'first JavaScript program: array'
				},
				{
					type: 'code',
					name: 'first JavaScript program: string'
				}
			]
		}
	],
	[
		{
			name: 'First C++ Program',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In C++'
				},
				{
					type: 'code',
					name: 'basic C++ exercise: print'
				},
				{
					type: 'code',
					name: 'first C++ program: array'
				},
				{
					type: 'code',
					name: 'first C++ program: string'
				}
			]
		},
		{
			name: 'Basic C++',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In C++'
				},
				{
					type: 'code',
					name: 'basic C++ exercise: print'
				},
				{
					type: 'code',
					name: 'first C++ program: array'
				},
				{
					type: 'code',
					name: 'first C++ program: string'
				}
			]
		},
		{
			name: 'Advance C++',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In C++'
				},
				{
					type: 'code',
					name: 'basic C++ exercise: print'
				},
				{
					type: 'code',
					name: 'first C++ program: array'
				},
				{
					type: 'code',
					name: 'first C++ program: string'
				}
			]
		}
	],
	[
		{
			name: 'First Python Program',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In Python'
				},
				{
					type: 'code',
					name: 'basic Python exercise: print'
				},
				{
					type: 'code',
					name: 'first Python program: array'
				},
				{
					type: 'code',
					name: 'first Python program: string'
				}
			]
		},
		{
			name: 'Basic Python',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In Python'
				},
				{
					type: 'code',
					name: 'basic Python exercise: print'
				},
				{
					type: 'code',
					name: 'first Python program: array'
				},
				{
					type: 'code',
					name: 'first Python program: string'
				}
			]
		},
		{
			name: 'Advance Python',
			lessons: [
				{
					type: 'quiz',
					name: 'Data Type In Python'
				},
				{
					type: 'code',
					name: 'basic Python exercise: print'
				},
				{
					type: 'code',
					name: 'first Python program: array'
				},
				{
					type: 'code',
					name: 'first Python program: string'
				}
			]
		}
	]
];

export const Posts = [
	{
		title: "Lập trình song song",
		lastUpdate: "2024/02/26",
		tag: ["code"],
		description: "Trước khi tìm hiểu thế nào là lập trình song song cũng như cách code thì mình phải biết 1 chút về lịch sử hình thành nên ở bài 1 mình sẽ giới thiệu sơ lược những điều bạn nên biết ở lĩnh vực này. 1 lưu ý nhỏ là nếu bạn nào muốn đọc bằng tiếng anh thì có thể ghé qua github, vì tiếng anh nên từ ngữ dùng sẽ chính xác hơn khi viết lại bằng tiếng việt"
	},
	{
		title: "Mô Hình MVC",
		lastUpdate: "2024/02/26",
		tag: ["MVC", "architecture"],
		description: "1. Kiến thức nền tảng1.1 Tìm hiểu mô hình MVC là gì?MVC là viết tắt của cụm từ “Model-View-Controller“.Đây là mô hình thiết kế được sử dụng trong kỹ thuật phần mềm.MVC là một mẫu kiến trúc phần mềm để tạo lập giao diện người dùng trên máy tính.MVC chia thành ba phần được kết nối với nhau và mỗi thành phần đều có một nhiệm vụ riêng của nó và độc"
	},
	{
		title: "Nội dung khóa học \"Lâp trình hướng đối tượng\"",
		lastUpdate: "2024/01/26",
		tag: ["code", "Object-Oriented-Programming"],
		description: "Thời gian qua mình thấy khá nhiều bạn trong khóa học này gặp phải:\"Đề, TestCase, UML(Hình mô tả lớp với thuộc tính và phương thức)\", sai, thiếu rõ ràng và gây hiểu nhầm.Vậy lên mình viết Comment này để các bạn có thể: Chỉ ra chỗ sai của \" và số của bài mà các bạn đang gặp phải.Rồi mình sẽ kiểm tra, tổng hợp lại và gửi lên \"đội ngũ hỗ trợ\" để họ khắc phục.Hoặc các bạn có thể comment vào đây: https://codelearn.io/learning/lap-trinh-huong-doi-tuong-trong-cpp"
	}
]

export const language = [
	{ value: 'C', name: 'C' },
	{ value: 'C++', name: 'C++' },
	{ value: 'Java', name: 'Java' },
];

export const payments = [
	{ value: 'Free', name: 'Free' },
	{ value: 'With Fee', name: 'With Fee' },
];

export const tags = [
	{ value: 'All', name: 'All' },
	{ value: 'C', name: 'C' },
	{ value: 'C%2B%2B', name: 'C++' },
	{ value: 'Java', name: 'Java' },
];

export let inputTypes = [
	{ value: 'int', name: 'int' },
	{ value: 'String', name: 'String' },
	{ value: 'boolean', name: 'boolean' },
	{ value: 'int[]', name: 'int[]' },
	{ value: 'String[]', name: 'String[]' }
];

export let resultTypes = [
	{ value: 'int', name: 'int' },
	{ value: 'String', name: 'String' },
	{ value: 'boolean', name: 'boolean' },
];

export let statuses = [
	{ value: 'All', name: 'All' },
	{ value: 'Pending', name: 'Pending' },
	{ value: 'Accepted', name: 'Accepted' },
	{ value: 'Rejected', name: 'Rejected' },
]

export const codeLanguage = ['C#', 'Java']