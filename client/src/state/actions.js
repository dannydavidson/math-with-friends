export const actionTypes = {
  'SET_ACTIVE': '@arithmetic/SET_ACTIVE',
  'UPDATE_PROBLEMS': '@arithmetic/UPDATE_PROBLEMS'
};

export class Actions {

  constructor({ firebase, solver, selectors }) {
    this.selectors = selectors;
    this.solver = solver;
    this.sessions = firebase.database().ref('sessions');
  }

  authLogin(uid) {
    return (dispatch) => {
      this.ref = this.sessions.child(uid);
      this.ref.onDisconnect().remove();

      dispatch(this.newProblem());
      dispatch(this.setActive(uid));

      this.sessions.on('value', (snapshot) => {
        dispatch(this.updateProblems(snapshot.val()));
      })
    }
  }

  authLogout() {
    return (dispatch) => {
      this.sessions.off();
    }
  }

  authFail() {
    return (dispatch) => {
      console.error('Something is up with Firebase.');
    }
  }

  updateProblems(problems) {
    return {
      type: actionTypes.UPDATE_PROBLEMS,
      value: {
        problems
      }
    }
  }

  testSolution() {
    return (dispatch, getState) => {
      const state = getState();
      const solution = this.selectors.getSolution(state, state.active);

      const isCorrect = this.problem.testVariableSolution(solution);
      const correctValue = !isCorrect ? this.problem.getSolvedVariable() : null;

      this.ref.update({
        isCorrect,
        correctValue
      });
    }
  }

  updateSolution(value) {
    return () => {
      this.ref.update({
        value
      });
    }
  }

  setActive(uid) {
    return {
      type: actionTypes.SET_ACTIVE,
      value: {
        uid
      }
    }
  }

  newProblem() {
    return () => {
      this.problem = this.solver.newProblem();
      this.ref.set(this.problem.getEquation());
    }
  }

}

export function instance({ firebase, solver, selectors }) {
  const actions = new Actions({firebase, solver, selectors});

  return {
    actions,
    actionTypes
  };
}
