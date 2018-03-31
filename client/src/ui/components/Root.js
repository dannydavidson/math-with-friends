import React from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: '20px'
  },
  title: {
    textAlign: 'center',
    padding: '20px 20px 0 20px'
  },
  subtitle: {
    textAlign: 'center',
    padding: '10px 20px 20px 20px'
  }
});

const Root = ({ ProblemCard, cards = [], classes }) => {

  cards = cards.map((cardId, i) => {
    return <ProblemCard id={cardId} key={i} />
  })

  return (
    <div>
      <Typography className={classes.title} variant="display2">
        Math with Friends!
      </Typography>
      <Typography className={classes.subtitle} variant="subheading" gutterBottom>
        Practice your arithmetic with all your friends.
        Every browser session gets its own practice card.
        You can see your friends' work and they can see yours.
      </Typography>
      <div className={classes.container}>
        {cards}
      </div>
    </div>
  )
}

export default withStyles(styles)(Root);

