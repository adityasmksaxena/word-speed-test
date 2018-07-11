import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {DashboardActions} from '../actions';
import axios from 'axios/index';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

// import {SAVE_WORDLIST} from '../actions/types';
import RemainingTime from '../components/RemainingTime';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
});

class Dashboard extends Component {

  state = {
    markup: '',
    inputText: '',
    learnedInput: '',
    wordsCnt: 0,
    raceStartTime: '',
    raceTimeMinutes: 2,
  };

  getList = async () => {
    try {
      const url = 'http://www.randomtext.me/api';
      const response = await axios.get(url);
      let markup = response.data.text_out;
      this.setState(() => ({ markup }));
    } catch (err) {
    }
  };

  componentDidMount() {
    this.getList();
  }

  startRace = () => {
    this.setState((prev) => ({ raceStartTime: moment() }))
  };

  handleChange = (e) => {
    e.preventDefault();
    const { raceStartTime } = this.state;
    if(!raceStartTime) {
      this.startRace();
    }

    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }),
      () => {
        const { inputText, learnedInput } = this.state;
        if(value.length !== 0) {
          const key = value.substring(value.length -1);
          if(key === ' ') {
            let p1 = this.paraNode.firstChild.innerText;
            if(p1.indexOf(learnedInput + inputText) === 0) {
              this.setState((prev) => ({
                inputText: '',
                learnedInput: learnedInput + this.state.inputText,
                wordsCnt: prev.wordsCnt + 1,
              }))
            }
          }
        }
      }
    );
  };

  finishGame = () => {
    this.setState(() => ({ raceStartTime: '', resultDialog: true }));
  };

  showResultDialog = () => {
    return (
      <Dialog onClose={this.handleClose} open={true}>
        <DialogTitle id="simple-dialog-title">Final Results</DialogTitle>
        <div>
          `Word Speed Per Minute : ${this.state.wordsCnt / this.state.raceTimeMinutes}`
        </div>
      </Dialog>
    )
  };

  render () {
    const { markup, inputText, raceStartTime, raceTimeMinutes } = this.state;
    const { classes } = this.props;

    let getBackTime = '';
    if(raceStartTime) {
      getBackTime = moment(raceStartTime);
      getBackTime.add(raceTimeMinutes, 'minutes');
    }
    return (
      <Fragment>
        {getBackTime &&
        <div>
          <RemainingTime
            getBackTime={getBackTime}
            finishGame={this.finishGame}
          />
        </div>}
        <div id="inputPara" dangerouslySetInnerHTML={{ __html: markup }} ref={node => { this.paraNode = node; }} />
        <form>
          <TextField
            id="input_text"
            name="inputText"
            label="Input Text"
            className={classes.textField}
            value={inputText}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            fullWidth
          />
        </form>
        <div>Current Text : {this.state.inputText}</div>
        <div>Learned Text : {this.state.learnedInput}</div>
        <div>Correct Words Count : {this.state.wordsCnt}</div>
        {this.state.resultDialog && this.showResultDialog()}
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  wordList: state.wordRacer.wordList,
});

export default connect(mapStateToProps, DashboardActions)(withStyles(styles)(Dashboard));
