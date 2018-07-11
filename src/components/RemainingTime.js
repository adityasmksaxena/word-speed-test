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
    if(now < getBackTime) {
      const diff = moment(getBackTime - now);
      return diff.utcOffset("+00:00").format('mm:ss');
    } else {
      return '';
    }
  }
}

export default RemainingTime;
