const authReducer = (state = { authData: null, loading: false, error: false , msg: 'OK'}, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: false }
        case 'AUTH_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload, loading: false, error: false }
        case 'AUTH_FAIL':
            return { ...state,   msg: action?.payload.response.data , loading: false, error: true }


            
        case 'UPDATE_USER_START':
            return { ...state, updateLoading: true, error: false }
        case 'UPDATE_USER_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload, updateLoading: false, error: false }
        case 'UPDATE_USER_FAIL':
            return { ...state, updateLoading: false, error: true }

        
        case 'FOLLOW_USER':
            console.log(action?.payload);
            return { ...state, authData: {...state.authData , user: {...state.authData.user, following: [...state.authData.user.following, action?.payload]}} }
        
        case 'UNFOLLOW_USER':
            console.log(action?.payload);
            return { ...state, authData: {...state.authData , user: {...state.authData.user, following: [...state.authData.user.following.filter((id) => id !== action?.payload)]}}}
        
        case 'LOG_OUT':
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: false }
        default:
            return state;
    }
}
export default authReducer;