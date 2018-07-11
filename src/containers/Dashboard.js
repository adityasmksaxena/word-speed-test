import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {DashboardActions} from '../actions';
import axios from 'axios/index';
// import {SAVE_WORDLIST} from '../actions/types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Dashboard extends Component {

  state = {
    markup: '',
    inputText: '',
    learnedInput: '',
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

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }),
      () => {
        const { inputText, learnedInput } = this.state;
        if(value.length !== 0) {
          const key = value.substring(value.length -1);
          if(key === ' ') {
            let p1 = this.paraNode.firstChild.innerText;
            if(p1.indexOf(learnedInput + inputText) === 0) {
              this.setState((prev) => ({ inputText: '', learnedInput: learnedInput + this.state.inputText }))
            }
          }
        }
      }
    );
  };

  render () {
    const { markup, inputText } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
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
        <div>Correct Text : {this.state.learnedInput}</div>
        <div>Current Text : {this.state.inputText}</div>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  wordList: state.wordRacer.wordList,
});

export default connect(mapStateToProps, DashboardActions)(withStyles(styles)(Dashboard));
