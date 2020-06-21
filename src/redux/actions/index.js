export const openModal = type => dispatch => {
  dispatch({ type });
};

export const closeModal = type => dispatch => {
  dispatch({ type });
};

export const handleNews = (type,payload) => dispatch =>{
  dispatch({type, payload})
}
export const handleAdmin = (type,payload) => dispatch =>{
  dispatch({type, payload})
}

export default { openModal, closeModal , handleAdmin, handleNews};
