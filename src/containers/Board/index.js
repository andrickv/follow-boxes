import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBoardData } from './selectors';

import './style/style.scss';

const stateToProps = state => ({
  boardData: getBoardData(state),
});

const actionToProps = () => ({
  // initAction: payload => dispatch(init(payload)),
});

@connect(stateToProps, actionToProps)
class Board extends Component {
  render() {
    const { boardData } = this.props;
    return (
      <div className="board-wrapper">
        <div className="board">
          {
            boardData.map((row, ri) => (
              <div key={`row-${ri + 1}`} className="board-row">
                {
                  row.map((cal, ci) => (
                    <div key={`col-${ci + 1}`} className={`board-box ${ri === 2 && ci === 5 && 'active'} ${ri === 3 && ci === 5 && 'predict'}`} />
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Board;
