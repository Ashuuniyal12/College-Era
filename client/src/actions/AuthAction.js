import * as AuthApi from '../API/AuthRequest';

export const logIn=(formData)=>async(dispatch)=>{

    dispatch({type:'AUTH_START'});
    try {
        const {data} = await AuthApi.logIn(formData);
        dispatch({type:'AUTH_SUCCESS',payload:data});
    } catch (error) {
        console.log(error);
        dispatch({type:'AUTH_FAIL',payload:error});
    }
}

export const signUp=(formData)=>async(dispatch)=>{

    dispatch({type:'AUTH_START'});
    try {
        const {data} = await AuthApi.signUp(formData);
        dispatch({type:'AUTH_SUCCESS',payload:data});
    } catch (error) {
        console.log(error);
        dispatch({type:'AUTH_FAIL',payload:error});
    }
}

export const logout=()=>async (dispatch)=>{
    dispatch({type:'LOG_OUT'});
}