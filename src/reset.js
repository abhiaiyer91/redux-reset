const DEFAULT_RESET_TYPE = 'RESET_STATE';
/**
 * Add a reset to store state for given reducer
 * @param reducer
 * @param initialState - value we are resetting to
 * @param resetType - override default reset type
 * @returns composedReducer - Higher order function
 */
export const composeResetReducer = function composeResetReducer(reducer, initialState, resetType) {
  const resetActionType = resetType || DEFAULT_RESET_TYPE;
  return function composedReducer(state, action) {
    if (action.type === resetActionType) {
      return initialState;
    }
    return reducer(state, action);
  };
};
