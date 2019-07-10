export const Types = {
  REQUEST_SIGN_UP: 'browse/REQUEST_SIGN_UP',
  SUCCESS_SIGN_UP: 'browse/SUCCESS_SIGN_UP',
  FAILURE_SIGN_UP: 'browse/FAILURE_SIGN_UP',
};

const initialState = {
  loading: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.REQUEST_SIGN_UP:
      return { ...state, loading: true, error: '' };
    case Types.SUCCESS_SIGN_UP:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case Types.FAILURE_SIGN_UP:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export function requestSignUp(form) {
  return {
    type: Types.REQUEST_SIGN_UP,
    payload: {
      form,
    },
  };
}

export function failureSignUp(error) {
  return {
    type: Types.FAILURE_SIGN_UP,
    payload: {
      error,
    },
  };
}
