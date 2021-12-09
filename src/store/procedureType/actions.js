import axios from "axios";
export function addProcedureTyes(procedureTypes) {
  return {
    type: "procedureType/ADD_PROCEDURE_TYPES",
    payload: procedureTypes,
  };
}

export async function fetchProcedureTypes(dispatch, getSate) {
  try {
    const response = await axios.get(`http://localhost:4000/proceduretypes/`);
    dispatch(addProcedureTyes(response.data));
  } catch (e) {
    console.log(e);
  }
}
