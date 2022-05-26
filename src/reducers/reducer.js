
// let renderBlog = (userName) => {
// 	store.getState();
// 	let blogs = [];
// 	fetch(backend + "/blogs?" + new URLSearchParams({
// 		'name': userName
// 	}), {
// 		method: 'GET',
// 		credentials: 'include',
// 		headers: {
// 			'Access-Control-Allow-Origin': 'http://localhost:8080',
// 			'Access-Control-Allow-Credentials': true,
// 			'Content-Type': 'application/json',
// 		},
// 	}).then((response) => {
// 		if (!response.ok) throw Error(response.status);
// 		return response.json();
// 	}).then((data) => {
// 		console.log(data);
// 		if (!data.status) {
// 			console.log("failed");
// 			return [];
// 		}
// 		blogs = [...data.blogs];
// 		console.log(blogs)
// 		return blogs;
// 	})
// 	return blogs;
// }

const userChangeReducer = (state = {'user': '', 'blogs': []}, action) => {
	let result = {'user': '', 'blogs': []};
	switch (action.type) {
		case 'LOGOUT':
			result = {'user': '', 'blogs': []};
			break;
		case 'LOGIN':
			result = {'user': action.payload, 'blogs': action.blogInfo};
			break;
		case 'UPDATEBLOG':
			result = {'user': state.user, 'blogs': action.payload};
			break;
		default:
			break;
	}
	return result;
}

export default userChangeReducer;