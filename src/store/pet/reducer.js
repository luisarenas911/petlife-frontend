const initialState = {
  pets: null,
  detailPet: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "pet/ADD_DETAIL_PET": {
      return { ...state, detailPet: action.payload };
    }

    default:
      return state;
  }
}
