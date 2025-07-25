import * as UploadApi from "../api/UploadRequest";

// ✅ Upload Image Action - returns response to get Cloudinary URL
export const uploadImage = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const res = await UploadApi.uploadImage(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: res.data });
    return res; // ⬅️ IMPORTANT: return the response so frontend can access .data.url
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

// ✅ Upload Post Action - as-is
export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
