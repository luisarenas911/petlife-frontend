import axios from "axios";

export function addVets(vets) {
  return {
    type: "vet/ADD_VETS",
    payload: vets,
  };
}

export async function fetchVets(dispatch, getSate) {
  try {
    const response = await axios.get(`http://localhost:4000/vets/`);
    dispatch(addVets(response.data));
  } catch (e) {
    console.log(e);
  }
}

export function addDetailVet(vet) {
  return {
    type: "vet/ADD_DETAIL_VET",
    payload: vet,
  };
}

export function fetchDetailVet(vetId) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`http://localhost:4000/vets/${vetId}`);

      dispatch(addDetailVet(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}
