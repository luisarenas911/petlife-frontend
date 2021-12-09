const initialState = {
  procedureTypes: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "procedureType/ADD_PROCEDURE_TYPES": {
      return { ...state, procedureTypes: [...action.payload] };
    }

    default:
      return state;
  }
}
