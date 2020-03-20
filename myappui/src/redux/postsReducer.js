const postsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {

        case 'GET_ALL_POSTS':
            return { ...state, posts: action.payload }

        case 'ADD_POST':
            let currentPosts = state.posts;
            currentPosts.push(action.payload)
            return { ...state, posts: currentPosts }

        case 'DELETE_POST':
            let filterPosts = state.posts.filter(post => post.userId !== action.payload)
            return { ...state, posts: filterPosts }


        default:
            return state
    }
}
export default postsReducer