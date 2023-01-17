const postReducer = (state = {posts:[], loading: false, error: false, uploading : false}, action) => {
    switch(action.type){
        case 'UPLOAD_START':
            return {...state, uploading: true, error: false}
        case 'UPLOAD_SUCCESSFUL':
            return {...state, posts: [action.data,...state.posts], uploading: false, error: false}
        case 'UPLOAD_FAILED':
            return {...state, uploading: false, error: true}
        case 'RETREVING_START':
            return {...state, loading: true, error: false}
        case 'RETREVING_FAILED':
            return {...state, loading: false, error: true}
        case 'RETREVING_SUCCESSFUL':
            return {...state, posts: action.data, loading: false, error: false}
        default:
            return state;
    }
}

export default postReducer;