import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBoardData } from './selectors';

const stateToProps = state => ({
  boardData: getBoardData(state),
});

const actionToProps = () => ({
  // initAction: payload => dispatch(init(payload)),
});

@connect(stateToProps, actionToProps)
class Board extends Component {
  constructor(props) {
    super(props);

    this.asd = () => {

    };
  }

  render() {
    const { boardData } = this.props;
    return (
      <div className="board-wrapper">
        <div className="board">
          {
            boardData.map(row => (
              <div className="board-row">
                {
                  row.map(col => (
                    <div className="board-box">{col}</div>
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
