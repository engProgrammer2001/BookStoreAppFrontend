const initialState = {
  recentaddedbook: null,
  loading: false,
  error: null,
  cartItems: [],
};

export const recentAddedBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECENT_ADDED_BOOK_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RECENT_ADDED_BOOK_SUCCESS:
      return {
        ...state,
        recentaddedbook: action.recentaddedbook,
        loading: false,
      };
    case GET_RECENT_ADDED_BOOK_FAILURE:
      return { ...state, loading: false, error: action.cartItems };

    default:
      return state;
  }
};
export default recentAddedBookReducer;
