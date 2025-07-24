import * as UserApi from "../api/UserRequest";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);

    // ✅ Log full response from backend
    console.log("🔁 Updated User Data Received from Backend:", data);

    // Save to localStorage and dispatch
    localStorage.setItem("profile", JSON.stringify(data));
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};
