import { useSelector, useDispatch } from "react-redux";
import { fetchVets } from "../store/vet/actions";
import { useEffect } from "react";
import { selectVets } from "../store/vet/selectors";

export default function HomePage() {
  const vets = useSelector(selectVets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVets);
  }, [dispatch]);
  return (
    <div>
      <h1>Vet Search</h1>
      <h2>Vets</h2>
      {vets
        ? vets.map((vet) => {
            return (
              <div key={vet.id}>
                <img src={vet.imageUrl} alt={vet.name} width="300" />
                <h3>{vet.name}</h3>
                <h3>{vet.address}</h3>
                <h3>{vet.phone}</h3>
                <h3>{vet.description}</h3>
                <h3>{vet.email}</h3>
              </div>
            );
          })
        : null}
    </div>
  );
}
