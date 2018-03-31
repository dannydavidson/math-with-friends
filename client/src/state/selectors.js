
export class Selectors {

  getProblems(state) {
    return state.problems ? Object.keys(state.problems) : [];
  }

  getProblem(state, id) {
    return state.problems ? state.problems[id] : {};
  }

  isActive(state, id) {
    return state.active ? state.active === id : false;
  }

  getSolution(state, id) {
    return state.problems ? state.problems[id].value : null;
  }
}

export function instance() {
  return new Selectors();
}
