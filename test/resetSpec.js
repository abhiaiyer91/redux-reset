import { assert } from 'chai';
import { createStore, combineReducers } from 'redux';
import { composeResetReducer, DEFAULT_RESET_TYPE } from '../src/reset';

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

function testReducer(state = false, action) {
  if (action.type === 'TOGGLE') {
    return true;
  }
  return state;
}

describe('Reset Reducer', () => {
  it('should reset state of the reducer', () => {
    const rootReducer = combineReducers({
      test: composeResetReducer(testReducer, false),
    });
    const store = createStore(rootReducer);
    // toggle the state
    toggleState(store);
    // reset
    resetState(DEFAULT_RESET_TYPE, store);
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

  it('should reset state with initialStates', () => {
    const rootReducer = composeResetReducer(
      combineReducers({
        test: testReducer,
        test2: testReducer,
      }),
      { test2: true },
    );

    const store = createStore(rootReducer);
    // toggle the state
    toggleState(store);
    // reset
    resetState(DEFAULT_RESET_TYPE, store);
    assert.equal(store.getState().test, false);
    assert.equal(store.getState().test2, true);
  });
});
