import * as UploadApi from '../API/UploadRequest';


export const uploadImg = (data) => async (dispatch) => {
    try{
        await UploadApi.uploadImg(data);

    }catch(err){
        console.log(err)
    }
} 