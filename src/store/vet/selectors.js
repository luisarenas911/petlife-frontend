export const selectVets = (reduxState) => {
  const vets = reduxState.vet.vets;
  return vets;
};

export const selectDetailVet = (reduxState) => {
  const vet = reduxState.vet.detailVet;
  return vet;
};
