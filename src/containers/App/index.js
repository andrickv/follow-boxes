import React from 'react';
import { connect } from 'react-redux';

import { getInitData } from './selectors';
import { init } from './reducer';

import Board from '../Board';

import './style/style.scss';

const stateToProps = state => ({
  initData: getInitData(state),
});

const actionToProps = dispatch => ({
  initAction: payload => dispatch(init(payload)),
});

@connect(stateToProps, actionToProps)
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header />
        <main className="main-wrapper">
          <Board />
          <div className="stats" />
        </main>
      </div>
    );
  }
}

export default App;
