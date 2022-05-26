export const loginUser = (userName, blogs) => {
    return {
        type: 'LOGIN',
        payload: userName,
        blogInfo: blogs
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT',
    }
}

export const updateBlog = (blogs) => {
    return {
        type: 'UPDATEBLOG',
        payload: blogs,
    }
}
