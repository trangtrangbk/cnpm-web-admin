import * as types from '../constants';

const initialState = {
  editAdmin: false,
  addAdmin : false
};

export const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.OPEN_MODAL_ADD_ADMIN:
      return {
        ...initialState,
        addAdmin: true
      };
    case types.OPEN_MODAL_EDIT_ADMIN:
        return {
          ...initialState,
        editAdmin: true
      };
    case types.CLOSE_MODAL_ADD_ADMIN:
    case types.CLOSE_MODAL_EDIT_ADMIN:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default reducer;
