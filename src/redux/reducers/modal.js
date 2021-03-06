import * as types from "../constants";

const initialState = {
  editAdmin: false,
  addAdmin: false,
  viewNews: false,
};

export const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.OPEN_MODAL_ADD_ADMIN:
      return {
        ...initialState,
        addAdmin: true,
      };
    case types.OPEN_MODAL_EDIT_ADMIN:
      return {
        ...initialState,
        editAdmin: true,
      };
    case types.OPEN_MODEL_VIEW_NEWS:
      return {
        ...initialState,
        viewNews: true,
      };
    case types.CLOSE_MODAL_ADD_ADMIN:
    case types.CLOSE_MODAL_EDIT_ADMIN:
    case types.CLOSE_MODEL_VIEW_NEWS:

      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
