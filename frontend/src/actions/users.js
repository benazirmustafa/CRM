import axios from "axios";
import {
  ALL_USERS,
  ALL_USERS_LIST,
  ALL_GROUPS,
  ALL_PERMISSIONS,
  MANAGE_GROUPS,
  INIT_USER_ACTION,
  SUCCESS_USER_ACTION,
  ERROR_USER_ACTION,
  SEARCHING,
  SEARCH_DONE,
} from "../actions/types";
import { createMessage } from "./alerts";
import { tokenConfig, tokenConfigUpload } from "./auth";

// All Permissions
export const permissions = () => (dispatch, getState) => {
  axios
    .get(`/auth/api/auth/permissions/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ALL_PERMISSIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage(Object.values(err.response.data)[0], "error"));
      }
    });
};

// Add Group
export const add_group = (body) => (dispatch, getState) => {
  axios
    .post(`/auth/api/auth/manage-groups/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage("Group Created Successfully", "success"));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage(Object.values(err.response.data)[0], "error"));
      }
    });
};
// All groups
export const groups = () => (dispatch, getState) => {
  axios
    .get(`/auth/api/auth/all-groups/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ALL_GROUPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage(Object.values(err.response.data)[0], "error"));
      }
    });
};

// All groups
export const get_groups = (body, limit, offset) => (dispatch, getState) => {
  var url;
  if (body) {
    if (body.group) {
      url = `/auth/api/auth/manage-groups/?limit=${limit}&offset=${offset}&id=${body.group}`;
    }
  } else {
    url = `/auth/api/auth/manage-groups/?limit=${limit}&offset=${offset}`;
  }
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: MANAGE_GROUPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage("Something went wrong", "error"));
      }
    });
};

export const updategroup =
  (limit, offset, id, body) => (dispatch, getState) => {
    axios
      .put(`/auth/api/auth/manage-groups/${id}`, body, tokenConfig(getState))
      .then((res) => {
        dispatch(createMessage("Group Updated Successfully", "success"));
        dispatch(get_groups(null, limit, offset));
      })
      .catch((err) => {
        if (!err.response) {
          dispatch(
            createMessage("Network Error. Something went wrong!", "error")
          );
        } else {
          dispatch(createMessage(Object.values(err.response.data)[0], "error"));
        }
      });
  };
export const deletegroup = (limit, offset, id) => (dispatch, getState) => {
  axios
    .delete(`/auth/api/auth/manage-groups/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(get_groups(null, limit, offset));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage("Something went wrong", "error"));
      }
      dispatch(get_groups(null, limit, 0));
    });
};

// Create User
export const create_user = (body) => (dispatch, getState) => {
  dispatch({
    type: INIT_USER_ACTION,
  });
  axios
    .post(`/auth/api/auth/manage-user/`, body, tokenConfigUpload(getState))
    .then((res) => {
      dispatch({
        type: SUCCESS_USER_ACTION,
      });
      dispatch(createMessage("User Created Successfully", "success"));
    })
    .catch((err) => {
      dispatch({
        type: ERROR_USER_ACTION,
      });
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage(Object.values(err.response.data)[0], "error"));
      }
    });
};
// All USERS
export const allusers = (body, limit, offset) => (dispatch, getState) => {
  var url;
  if (body) {
    if (body.group && body.username) {
      url = `/auth/api/auth/manage-user/?limit=${limit}&offset=${offset}&username__in=${
        body.username
      }${
        body.group === "Admin" ? `&is_superuser=true` : `&groups=${body.group}`
      }`;
    } else if (body.group) {
      url = `/auth/api/auth/manage-user/?limit=${limit}&offset=${offset}${
        body.group === "Admin" ? `&is_superuser=true` : `&groups=${body.group}`
      }`;
    } else if (body.username) {
      url = `/auth/api/auth/manage-user/?limit=${limit}&offset=${offset}&username__in=${body.username}`;
    }
  } else {
    url = `/auth/api/auth/manage-user/?limit=${limit}&offset=${offset}`;
  }
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ALL_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage("Something went wrong", "error"));
      }
    });
};

export const updateuser = (limit, offset, id, body) => (dispatch, getState) => {
  axios
    .put(`/auth/api/auth/manage-user/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage("User Updated Successfully", "success"));
      dispatch(allusers(null, limit, offset));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage(Object.values(err.response.data)[0], "error"));
      }
    });
};
export const deleteuser = (limit, offset, id) => (dispatch, getState) => {
  axios
    .delete(`/auth/api/auth/manage-user/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch(allusers(null, limit, offset));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage("Something went wrong", "error"));
      }
      dispatch(allusers(null, limit, 0));
    });
};

// Searc Users
export const searchuser = (type, body) => (dispatch, getState) => {
  dispatch({ type: SEARCHING });
  axios
    .post(`/auth/api/auth/search/${type}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: SEARCH_DONE });
      dispatch({
        type: ALL_USERS_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(
          createMessage(
            `${Object.keys(err.response.data)[0]}: ${
              Object.values(err.response.data)[0]
            }`,
            "error"
          )
        );
      }
    });
};
// Change Password
export const change_password = (body) => (dispatch, getState) => {
  axios
    .put(`/auth/api/auth/change-password/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage("Password Changed Successfully", "success"));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          createMessage("Network Error. Something went wrong!", "error")
        );
      } else {
        dispatch(createMessage(Object.values(err.response.data)[0], "error"));
      }
    });
};
