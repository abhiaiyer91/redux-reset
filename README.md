# redux-reset-store
Higher Order Reducer for resetting multiple parts of your state tree

[![npm version](https://badge.fury.io/js/redux-reset-store.svg)](https://badge.fury.io/js/redux-reset-store)
[![Get on Slack](http://slack.apollostack.com/badge.svg)](http://slack.apollostack.com/)

Wrap any of your Reducers with this higher order reducer to clear state when a certain action is dispatched.

### `composeResetReducer(reducerFn, initialState, resetType)`

#### Arguments

1. `reducer` *(Function)*: A reducing function that returns the next state tree given the current state tree and an action to handle.

2. [`initialState`] *(any)*: The initial state. This is the value you want to reset the state to when the preferred action type is dispatched

3. [`resetType`] *(string)*: Preferred Action Type to trigger reset in state. Default is `"RESET_STATE"`



### Example

```js
import { composeResetReducer } from 'redux-reset-store';
import { store } from './store';

// current state after init = false
const toggleReducer = composeResetReducer(function toggleReducer(state = false, action = {}) {
  if (action.type === 'TOGGLE') {
    return true;
  }
  return state;
}, false);

export default toggleReducer

// Default action type is RESET_STATE
store.dispatch({type: "TOGGLE"});

// current state after toggle = true
store.dispatch({type: "RESET_STATE"});
// current state after reset = false
```
