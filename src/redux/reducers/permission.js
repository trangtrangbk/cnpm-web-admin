import * as types from "../constants";

const initialState = {
  permissions : []
};

export const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_ROLES :
      return {
        ...initialState,
        permissions : actions.payloads
      }
    case types.RESET_SELECTED_NEWS:

      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
