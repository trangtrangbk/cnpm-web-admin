import * as types from "../constants";

const initialState = {
  selectedNews : []
};

export const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.SET_SELECTED_NEWS :
      return {
        ...initialState,
        selectedNews : actions.payload
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
