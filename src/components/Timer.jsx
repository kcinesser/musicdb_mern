import React, { Component } from "react";


export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timerOn: false,
      timerPause: false,
      timerStart: 0,
      timerTime: 0
    }
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
      timerPause: false
    });

    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false, timerPause: true });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
      timerPause: false
    });
  };

  handleRecord = () => {
    this.props.handleRecord(this.state.timerTime);

    this.setState({
      timerStart: 0,
      timerTime: 0,
      timerPause: false
    });
  }

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <div className="timer">
        <div className={"timer__header" + (this.state.timerPause ? ' pause' : '')}>
          {hours} : {minutes} : {seconds}
        </div>
        <div className="timer__controls">
          {this.state.timerOn === false && this.state.timerTime === 0 && (
            <button className="button button--play" onClick={this.startTimer}></button>
          )}
          {this.state.timerOn === true && (
            <button className="button button--pause" onClick={this.stopTimer}></button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="button button--play" onClick={this.startTimer}></button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="button button--reset" onClick={this.resetTimer}></button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <button className="button button--primary" onClick={this.handleRecord}>Record Routine</button>
          )}
        </div>
      </div>
    );
  }
}
