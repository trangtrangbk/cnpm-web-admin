import * as types from "../constants";

const initialState = {
  selectedAdmin : []
};

export const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_SELECTED_ADMIN :
      return {
        ...initialState,
        selectedAdmin : actions.payload
      }
    case types.RESET_SELECTED_ADMIN:

      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
