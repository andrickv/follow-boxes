import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBoardData } from './selectors';
import { boxAction } from './reducer';

import './style/style.scss';

const stateToProps = state => ({
  boardData: getBoardData(state),
});

const actionToProps = dispatch => ({
  boxAction: payload => dispatch(boxAction(payload)),
});

@connect(stateToProps, actionToProps)
class Board extends Component {
  render() {
    const { boardData, boxAction } = this.props;
    return (
      <div className="board-wrapper">
        <div className="board">
          {
            boardData.map((row, ri) => (
              <div key={`row-${ri + 1}`} className="board-row">
                {
                  row.map((box, ci) => (
                    <div
                      key={`col-${ci + 1}`}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => { }}
                      className={`board-box ${box.status}`}
                      onClick={() => {
                        boxAction({ box });
                      }}
                    />
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
