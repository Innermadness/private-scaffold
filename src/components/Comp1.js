import React, { Component } from 'react';

class Comp1 extends Component {
  componentDidMount() {
    console.log('Comp1DidMount');
  }

  render() {
    return (
      <h2>这是Comp1~~</h2>
    );
  }
}

export default Comp1;
