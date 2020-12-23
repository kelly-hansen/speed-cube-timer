import React from 'react';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsed: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  startTimer() {
    this.setState({
      running: true,
      elapsed: 0
    });
  }

  stopTimer() {
    const elapsed = this.state.elapsed;
    this.setState({
      running: false,
      elapsed
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.running) {
        this.setState({
          running: true,
          elapsed: this.state.elapsed + 10
        });
      }
    }, 10);
  }

  render() {
    let time = this.state.elapsed;
    const min = Math.floor(time / 60000);
    time = time - (min * 60000);
    const sec = Math.floor(time / 1000).toString(10);
    time = time - (sec * 1000);
    const hundreths = Math.floor(time / 10).toString(10);
    let displayedSec;
    if (sec.length === 1) {
      displayedSec = '0' + sec;
    } else {
      displayedSec = sec;
    }
    let displayedHundreths;
    if (hundreths.length === 1) {
      displayedHundreths = '0' + hundreths;
    } else {
      displayedHundreths = hundreths;
    }
    const displayedTime = `${min}:${displayedSec}.${displayedHundreths}`;

    let timerClass;
    if (this.state.running) {
      timerClass = 'timer timer-running';
    } else {
      timerClass = 'timer timer-stopped';
    }
    const fullTimer = (
      <div className={timerClass} onClick={this.state.running ? this.stopTimer : this.startTimer}>
        <p className="counter">{displayedTime}</p>
        <p className="start-stop">{this.state.running ? 'STOP' : 'START'}</p>
      </div>
    );

    return fullTimer;
  }
}
