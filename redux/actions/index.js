import {
  SET_USER,
  EDIT_USER,
  DELETE_USER,
  ADD_USER,
} from "../constant/actions-types";

export const setUser = (payload) => {
  return { type: SET_USER, payload };
};
export const deleteUser = (payload) => {
  debugger;
  return { type: DELETE_USER, payload };
};
export const editUser = (payload) => {
  return { type: EDIT_USER, payload };
};
export const addUser = (payload) => {
  return { type: ADD_USER, payload };
};
