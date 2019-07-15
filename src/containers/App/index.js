import React from 'react';
import { connect } from 'react-redux';

import { getInitData } from './selectors';
import { init } from './reducer';

const stateToProps = state => ({
  initData: getInitData(state),
});

const actionToProps = dispatch => ({
  initAction: payload => dispatch(init(payload)),
});

@connect(stateToProps, actionToProps)
class App extends React.Component {
  render() {
    const { initData, initAction } = this.props;
    return (
      <div>
        {`Hello World! ${initData}`}
        <button type="button" onClick={() => { initAction({ init: 'Init Done' }); }}>Press it!</button>
      </div>
    );
  }
}

export default App;
