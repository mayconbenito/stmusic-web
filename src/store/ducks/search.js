export const Types = {
  REQUEST_SEARCH: 'browse/REQUEST_SEARCH',
  SUCCESS_SEARCH: 'browse/SUCCESS_SEARCH',
  FAILURE_SEARCH: 'browse/FAILURE_SEARCH',
  CLEAR_SEARCH: 'browse/CLEAR_SEARCH',
};

const initialState = {
  data: {
    artists: [],
    tracks: [],
  },
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.REQUEST_SEARCH:
      return { ...state, loading: true };
    case Types.SUCCESS_SEARCH:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case Types.FAILURE_SEARCH:
      return { ...state, loading: false };
    case Types.CLEAR_SEARCH:
      return { ...state, data: { artists: [], tracks: [] }, loading: true };
    default:
      return state;
  }
}

export function fetchSearch(query) {
  return {
    type: Types.REQUEST_SEARCH,
    payload: {
      query,
    },
  };
}

export function successSearch(data) {
  return {
    type: Types.SUCCESS_SEARCH,
    payload: {
      data: data.results,
    },
  };
}

export function failureSearch(error) {
  return {
    type: Types.FAILURE_SEARCH,
    payload: {
      error,
    },
  };
}

export function clearSearch() {
  return {
    type: Types.CLEAR_SEARCH,
  };
}
