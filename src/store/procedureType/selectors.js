export const selectProcedureTypes = (reduxState) => {
  const procedureTypes = reduxState.procedureType.procedureTypes;
  return procedureTypes;
};
