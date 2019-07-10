export const Types = {
  REQUEST_SIGN_IN: 'browse/REQUEST_SIGN_IN',
  SUCCESS_SIGN_IN: 'browse/SUCCESS_SIGN_IN',
  FAILURE_SIGN_IN: 'browse/FAILURE_SIGN_IN',
};

const initialState = {
  loading: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.REQUEST_SIGN_IN:
      return { ...state, loading: true, error: '' };
    case Types.SUCCESS_SIGN_UP:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case Types.FAILURE_SIGN_IN:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export function requestSignIn(form) {
  return {
    type: Types.REQUEST_SIGN_IN,
    payload: {
      form,
    },
  };
}

export function failureSignIn(error) {
  return {
    type: Types.FAILURE_SIGN_IN,
    payload: {
      error,
    },
  };
}
