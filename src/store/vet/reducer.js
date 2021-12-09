const initialState = {
  vets: [],
  detailVet: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "vet/ADD_VETS": {
      return { ...state, vets: [...action.payload] };
    }
    case "vet/ADD_DETAIL_VET": {
      return { ...state, detailVet: action.payload };
    }

    default:
      return state;
  }
}
