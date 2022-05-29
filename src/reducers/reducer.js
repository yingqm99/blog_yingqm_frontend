
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