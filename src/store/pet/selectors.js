export const selectDetailPet = (reduxState) => {
  const pet = reduxState.pet.detailPet;
  return pet;
};
