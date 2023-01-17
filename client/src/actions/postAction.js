import * as PostApi from '../API/PostRequest'

export const getTimeLinePosts=(id)=> async (dispatch)=>{
    dispatch({type:'RETREVING_START'})
    try{
       const {data} = await PostApi.getTimeLinePosts(id);
         dispatch({type:'RETREVING_SUCCESSFUL', data:data})
    }catch(err){
        console.log(err)
        dispatch({type:'RETREVING_FAILED'})
    }
}