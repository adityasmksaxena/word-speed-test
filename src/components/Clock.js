import React, { Component } from 'react';
import moment from 'moment';

class RemainingTime extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { getBackTime } = this.props;
    const now = moment();
    const diff = moment(getBackTime - now);
    return diff.utcOffset("+00:00").format('mm:ss');
  }
}

class Clock extends Component {

  render() {
    const getBackTime = moment();
    getBackTime.add(3, 'minute');
    return (
      <div>
        <RemainingTime getBackTime={getBackTime} />
      </div>
    );
  }
}

export default Clock;
