import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'hello, world!'
    };
  }

  render() {
    const { text } = this.state;
    return (
      <div>{text}</div>
    );
  }
}

export default hot(module)(App);
