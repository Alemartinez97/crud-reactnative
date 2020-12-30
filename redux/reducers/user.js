import {
  SET_USER,
  EDIT_USER,
  DELETE_USER,
  ADD_USER,
} from "../constant/actions-types";

const user = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return [...state, payload];
    case ADD_USER:
      return payload;
    case DELETE_USER:
      debugger
      return state.filter((user) => user.id !== payload);
    case EDIT_USER:
      return state.map((user) => {
        if (payload.id === user.id) {
          return payload;
        }
        return user;
      });
    default:
      return state;
  }
};
export default user;
