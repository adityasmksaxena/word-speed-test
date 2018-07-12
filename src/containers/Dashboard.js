import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {DashboardActions} from '../actions';
import axios from 'axios/index';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import RemainingTime from '../components/RemainingTime';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
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
    inputText: '',
    raceTimeMinutes: 3,
  };

  getList = async () => {
    try {
      const url = 'http://www.randomtext.me/api';
      const response = await axios.get(url);
      const dummyElement = document.createElement('div');
      dummyElement.innerHTML = response.data.text_out;
      const childPtags = dummyElement.getElementsByTagName('p');
      const childTagsArr = Array.from(childPtags).map((item) => item.innerText.trim());
      const { savePara } = this.props;
      savePara(childTagsArr);
    } catch (err) {
    }
  };

  componentDidMount() {
    this.getList();
  }

  handleChange = (e) => {
    e.preventDefault();
    const { raceStartTime, startRace } = this.props;
    if(!raceStartTime) {
      startRace();
    }
    const { name, value } = e.target;
    const key = value.substring(value.length -1);
    if(key === ' ') {
      const { paraList, learnedInput, inFocus, updateLearnedInput } = this.props;
      const newVal = learnedInput[inFocus] + value;
      if (paraList[inFocus].indexOf(newVal) === 0) {
        updateLearnedInput(inFocus, newVal);
        this.setState(() => ({ inputText: '' }));
        return;
      }
    } else if(key === '\n') {
      const { paraList, learnedInput, inFocus, updateLearnedInput, changeFocus } = this.props;
      const newVal = learnedInput[inFocus] + value.substring(0, value.length - 1);
      if (paraList[inFocus] === newVal) {
        updateLearnedInput(inFocus, newVal);
        changeFocus();
        this.setState(() => ({ inputText: '' }));
        return;
      }
    }
    this.setState(() => ({ [name]: value }));
  };

  finishRace = () => {
    this.setState(() => ({ resultDialog: true, inputText: ''}));
  };

  showResultDialog = () => {
    return (
      <Dialog onClose={this.handleClose} open={true}>
        <DialogTitle id="simple-dialog-title">Result</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Word Speed Per Minute : ${this.props.wordCnt / this.state.raceTimeMinutes}`}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  };

  render () {
    const { inputText, raceTimeMinutes } = this.state;
    const { paraList, learnedInput, wordCnt, raceStartTime, classes } = this.props;

    if (!paraList || paraList.length === 0) {
      return 'Loading';
    }

    let getBackTime = '';
    if(raceStartTime) {
      getBackTime = moment(raceStartTime);
      getBackTime.add(raceTimeMinutes, 'minutes');
    }
    return (
      <Paper className={classes.root} elevation={1}>
        {getBackTime ?
        <div>
          <RemainingTime
            getBackTime={getBackTime}
            finishRace={this.finishRace}
          />
        </div> : <div>03:00</div>}
        <div>Correct Words Count : {wordCnt}</div>

        {paraList.map((item, idx) => (
          <p key={idx}>
            <span
              style={{ color: 'green', fontWeight: 600 }}
            >
              {learnedInput[idx]}
            </span>
            {item.substring(learnedInput[idx].length)}
          </p>
        ))}

        <form>
          <TextField
            id="input_text"
            name="inputText"
            label="Input Text"
            multiline
            rowsMax="4"
            className={classes.textField}
            value={inputText}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            fullWidth
          />
        </form>

        {this.state.resultDialog && this.showResultDialog()}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  const { paraList, learnedInput, inFocus, wordCnt, raceStartTime,  } = state.wordRacer;
  return {
    paraList,
    learnedInput,
    inFocus,
    wordCnt,
    raceStartTime,
  }
};
export default connect(mapStateToProps, DashboardActions)(withStyles(styles)(Dashboard));
