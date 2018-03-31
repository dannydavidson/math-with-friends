import { connect } from 'react-redux';
import Root from 'ui/components/Root';
import problemCard from 'ui/controllers/ProblemCard';

export default function ({ actions, selectors }) {

  const ProblemCard = problemCard({ actions, selectors });

  return connect(
    (state) => {
      return {
        ProblemCard,
        cards: selectors.getProblems(state)
      };
    },
    (dispatch) => {
      return {

      };
    }
  )(Root);

}
