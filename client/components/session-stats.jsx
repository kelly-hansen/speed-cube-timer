import React from 'react';
import getDisplayTime from '../lib/get-display-time';

export default class SessionStats extends React.Component {

  getBest(times) {
    return times.length > 0 ? getDisplayTime(Math.min(...times)) : 'N/A';
  }

  getWorst(times) {
    return times.length > 0 ? getDisplayTime(Math.max(...times)) : 'N/A';
  }

  getAverage(times) {
    return times.length > 0 ? getDisplayTime(times.reduce((acc, cur) => acc + cur) / times.length) : 'N/A';
  }

  getMedian(times) {
    if (times.length === 0) return 'N/A';
    const timesCopy = times.slice();
    timesCopy.sort((a, b) => a - b);
    const split = Math.floor(timesCopy.length / 2);
    if (timesCopy.length % 2) {
      return getDisplayTime(timesCopy[split]);
    } else {
      return getDisplayTime((timesCopy[split] + timesCopy[split - 1]) / 2);
    }
  }

  getStdDeviation(times) {
    if (times.length === 0) return 'N/A';
    const avg = times.reduce((acc, cur) => acc + cur) / times.length;
    const varianceArr = times.map(time => Math.pow((time - avg), 2));
    const variance = varianceArr.reduce((acc, cur) => acc + cur) / varianceArr.length;
    const stdDeviation = Math.sqrt(variance);
    return getDisplayTime(stdDeviation);
  }

  getBestAvg5(times) {
    if (times.length < 5) {
      return 'N/A';
    }
    let best;
    for (let i = 0; i < times.length - 4; i++) {
      let accumulator = 0;
      for (let x = i; x < i + 5; x++) {
        accumulator += times[x];
      }
      const avg = accumulator / 5;
      if (best) {
        if (avg < best) {
          best = avg;
        }
      } else {
        best = avg;
      }
    }
    return getDisplayTime(best);
  }

  getBestAvg3Of5(times) {
    if (times.length < 5) {
      return 'N/A';
    }
    let best;
    for (let i = 0; i < times.length - 4; i++) {
      const sortedSet = times.slice(i, i + 5).sort((a, b) => a - b);
      const setOf3 = sortedSet.slice(1, 4);
      const avg = setOf3.reduce((acc, cur) => acc + cur) / 3;
      if (best) {
        if (avg < best) {
          best = avg;
        }
      } else {
        best = avg;
      }
    }
    return getDisplayTime(best);
  }

  render() {
    const times = this.props.sessionTimes.slice();
    const statsArray = [
      {
        name: 'Best',
        result: this.getBest(times)
      },
      {
        name: 'Worst',
        result: this.getWorst(times)
      },
      {
        name: 'Average',
        result: this.getAverage(times)
      },
      {
        name: 'Median',
        result: this.getMedian(times)
      },
      {
        name: 'Std Deviation',
        result: this.getStdDeviation(times)
      },
      {
        name: 'Best Avg 5',
        result: this.getBestAvg5(times)
      },
      {
        name: 'Best Avg 3 of 5',
        result: this.getBestAvg3Of5(times)
      }
    ];

    const statsForRender = statsArray.map((statObj, ind) => {
      return (
        <div
          key={'stat' + ind}
          className="d-flex justify-content-center mx-3">
          <p className="stat-col my-0 mr-1 text-right">{statObj.name + ':'}</p>
          <p className="stat-col my-0 ml-1 text-left">{statObj.result}</p>
        </div>
      );
    });

    return (
      <div className="session-stats">
        {statsForRender}
      </div>
    );
  }
}