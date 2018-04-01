import React from 'react';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';

@observer
class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
export default hot(module)(App);
