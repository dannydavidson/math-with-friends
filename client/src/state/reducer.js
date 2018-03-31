import _ from 'lodash';

export function instance({ actionTypes }) {
  return (state, action) => {
    switch (action.type) {

      case actionTypes.SET_ACTIVE:
        return Object.assign({}, state, {
          active: action.value.uid
        });

      case actionTypes.UPDATE_PROBLEMS:
        return Object.assign({}, state, {
          problems: action.value.problems
        });

      default:
        return state;
    }
  }
}
