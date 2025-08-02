import axios from "axios"

const API = axios.create({baseURL: "https://sever-cuverse-1.onrender.com"})
export const getTimelinePosts= (id)=> API.get(`/post/getPost/${id}`);
// export const likePost = (id, userId)=> API.put('post/${id}/like',{userId: userId})
export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})