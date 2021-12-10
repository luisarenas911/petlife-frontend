import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchUsers } from "../store/user/actions";
import { selectUsers } from "../store/user/selectors";

export default function VetSearch() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const vets = users.filter((user) => user.isVet);

  useEffect(() => {
    dispatch(fetchUsers);
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
