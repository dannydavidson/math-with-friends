import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Paper } from 'material-ui';

const styles = theme => ({
  container: {
    width: '300px',
    marginTop: '20px',
  },
  problem: {
    padding: '10px 10px 10px 10px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  prompt: {
    textAlign: 'center',
    padding: '5px'
  },
  input: {
    textAlign: 'center'
  }
});

class ProblemCard extends React.Component {

  componentDidMount() {
    this.removeKeyupListener();
    if (this.props.isActive) {
      this.submitHandler = this.submit.bind(this);
      window.addEventListener("keyup", this.submitHandler);
    }
  }

  componentWillUnmount() {
    this.removeKeyupListener();
  }

  removeKeyupListener() {
    window.removeEventListener("keyup", this.submitHandler);
  }

  submit(evt) {
    evt.preventDefault();

    if (evt.which === 13) {
      if (this.props.isCorrect === undefined) {
        this.props.submit();
      } else {
        this.props.newProblem();
      }
    }
  }

  render() {
    const {
      classes,
      left,
      operator,
      right,
      solution,
      value = '',
      isCorrect,
      correctValue,
      updateSolution,
      isActive } = this.props;

    var prompt;

    const input = (
      <input autoFocus type='number' className={classes.input} disabled={!isActive} value={value} onInput={updateSolution} />
    );
    const enterPrompt = isActive ? 'Press enter.' : '';

    // problem hasn't been tested and is local
    if (isCorrect === undefined && isActive) {
      prompt = (
        <div className={classes.prompt} style={{background: '#B29899'}}>
          Press enter to test your solution.
        </div>
      );
    }

    // problem hasn't been tested and is remote
    else if (isCorrect === undefined && !isActive) {
      prompt = (
        <div className={classes.prompt} style={{background: '#B2A698'}}>
          Your friend is thinking.
        </div>
      );
    }

    // problem was tested and is incorrect
    else if (!isCorrect) {
      prompt = (
        <div className={classes.prompt} style={{background: '#FF6160'}}>
          {`Sorry friend, the answer is ${correctValue}. ${enterPrompt}`}
        </div>
      )
    }

    // problem is tested and correct
    else {
      prompt = (
        <div className={classes.prompt} style={{background: '#0FFF58'}}>
          {`Nicely done friend! ${enterPrompt}`}
        </div>
      )
    }

    return (
      <Paper className={classes.container}>
        <div className={classes.problem} style={{background: isActive ? '#C7EEFF' : 'transparent'}}>
          {left === undefined ? input : <div>{left}</div>}
          <div>{operator}</div>
          {right === undefined ? input : <div>{right}</div>}
          <div>=</div>
          {solution === undefined ? input : <div>{solution}</div>}
        </div>
        {prompt}
      </Paper>
    )
  }
}

export default withStyles(styles)(ProblemCard);

