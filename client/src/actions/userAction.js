import * as UserApi from '../API/UserRequest'

export const updateUser =(formData , id) =>async (dispatch)=>{
    dispatch({type:'UPDATE_USER_START'});
    try {
        const {data} = await UserApi.updateUser(formData,id);
        dispatch({type:'UPDATE_USER_SUCCESS',payload:data});
    } catch (error) {
        console.log(error);
        dispatch({type:'UPDATE_USER_FAIL',payload:error});
    }
}


export const followUser = (id , data) => async (dispatch) => {
    dispatch({ type: 'FOLLOW_USER' ,payload:id});
    UserApi.followUser(id ,data)
}

export const unfollowUser = (id , data) => async (dispatch) => {
    dispatch({ type: 'UNFOLLOW_USER',payload:id});
    UserApi.unfollowUser(id ,data)
}