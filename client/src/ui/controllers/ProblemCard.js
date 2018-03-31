import { connect } from 'react-redux';
import ProblemCard from 'ui/components/ProblemCard';

export default function ({ actions, selectors }) {

  return connect(
    (state, ownProps) => {
      const props = {
        isActive: selectors.isActive(state, ownProps.id)
      };

      return Object.assign(props, selectors.getProblem(state, ownProps.id));
    },
    (dispatch) => {
      return {
        submit() {
          dispatch(actions.testSolution());
        },

        updateSolution(evt) {
          var value = parseInt(evt.target.value);
          dispatch(actions.updateSolution(value));
        },

        newProblem() {
          dispatch(actions.newProblem());
        }
      };
    }
  )(ProblemCard);

}
