import { assert } from 'chai';
import { createStore, combineReducers } from 'redux';
import { composeResetReducer } from '../src/reset';

function toggleState(store) {
  return store.dispatch({
    type: 'TOGGLE',
  });
}

function resetState(type, store) {
  return store.dispatch({
    type,
  });
}

describe('Reset Reducer', () => {
  function testReducer(state = false, action) {
    if (action.type === 'TOGGLE') {
      return true;
    }
    return state;
  }

  it('should reset state of the reducer', () => {
    const rootReducer = combineReducers({
      test: composeResetReducer(testReducer, false),
    });
    const store = createStore(rootReducer);
    // toggle the state
    toggleState(store);
    // reset
    resetState('RESET_STATE', store);
    assert.equal(store.getState().test, false);
  });

  it('should reset state with custom acton type', () => {
    const testType = 'RESET_TEST_STATE';
    const rootReducer = combineReducers({
      test: composeResetReducer(testReducer, false, testType),
    });
    const store = createStore(rootReducer);
    // toggle the state
    toggleState(store);
    // reset
    resetState(testType, store);
    assert.equal(store.getState().test, false);
  });
});
