import axios from "axios";
import { getUserWithStoredToken } from "../user/actions";

export function addDetailPet(pet) {
  return {
    type: "pet/ADD_DETAIL_PET",
    payload: pet,
  };
}
export function fetchDetailPet(petId) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`http://localhost:4000/pets/${petId}`);
      dispatch(addDetailPet(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function addAPet(name, breed, age, sex, imageUrl, token, userId) {
  return async function thunk(dispatch, getSate) {
    try {
      await axios.post(
        `http://localhost:4000/pets/`,
        {
          name,
          breed,
          age,
          sex,
          imageUrl,
          userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(getUserWithStoredToken);
    } catch (e) {
      console.log(e);
    }
  };
}

export function postProcedure(
  procedureTypeId,
  observations,
  vetId,
  petId,
  token
) {
  return async function thunk(dispatch, getState) {
    try {
      await axios.post(
        `http://localhost:4000/procedures/`,
        { procedureTypeId, observations, vetId, petId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDetailPet(petId);
    } catch (e) {
      console.log(e);
    }
  };
}
