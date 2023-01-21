import * as UploadApi from '../API/UploadRequest';

export const uploadPost = (data) => async (dispatch) => {
    dispatch({ type: 'UPLOAD_START' });
    try{
        const newPost = await UploadApi.uploadPost(data);
        dispatch({ type: 'UPLOAD_SUCCESSFUL', data: newPost.data});
    }
    catch(err){
        console.log(err)
        dispatch({ type: 'UPLOAD_FAILED', payload: err });
    }
}