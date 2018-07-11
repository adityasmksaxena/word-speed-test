import { Component } from 'react';
import moment from 'moment';

class RemainingTime extends Component {
  state={
    now: moment(),
  };
  componentDidMount() {
    const { getBackTime, finishGame } = this.props;
    this.interval = setInterval(() => {
      let now = moment();
      if(now > getBackTime) {
        clearInterval(this.interval);
        finishGame();
      } else {
        this.setState(() => ({ now: moment() }))
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { now } = this.state;
    const { getBackTime } = this.props;
    const diff = moment(getBackTime - now);
    return diff.utcOffset("+00:00").format('mm:ss');
  }
}

export default RemainingTime;
