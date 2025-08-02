// actions/userAction.js

import * as UserApi from '../api/UserRequest';

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserApi.followUser(id, data);
    dispatch({ type: "FOLLOW_USER", data: id });
  } catch (err) {
    console.log("Follow error:", err);
  }
};

export const unfollowUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserApi.unfollowUser(id, data);
    dispatch({ type: "UNFOLLOW_USER", data: id });
  } catch (err) {
    console.log("Unfollow error:", err);
  }
};
