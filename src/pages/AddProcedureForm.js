import { useState } from "react";
import { useDispatch } from "react-redux";
import { postProcedure } from "../store/pet/actions";

export default function AddProcedureForm() {
  const [procedureTypeId, setProcedureTypeId] = useState("");
  const [observations, setObservations] = useState("");
  const [vetId, setVetId] = useState("");
  const [petId, setPetId] = useState("");
  const dispatch = useDispatch();

  function procedurePosted() {
    if (procedureTypeId && observations && vetId && petId) {
      dispatch(postProcedure(procedureTypeId, observations, vetId, petId));
    }
  }
  return (
    <div>
      <h1>Add Procedure Form</h1>
      <label>prcedure type ID</label>
      <input
        type="number"
        value={procedureTypeId}
        onChange={(e) => setProcedureTypeId(e.target.value)}
      ></input>
      <br />
      <label>Observations</label>
      <input
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
      ></input>
      <br />
      <label>Pet ID</label>
      <input value={petId} onChange={(e) => setPetId(e.target.value)}></input>
      <br />
      <label>Veterinarian ID</label>
      <input
        value={vetId}
        type="number"
        onChange={(e) => setVetId(e.target.value)}
      ></input>
      <br />
      <button onClick={() => procedurePosted()}>Add procedure</button>
    </div>
  );
}
