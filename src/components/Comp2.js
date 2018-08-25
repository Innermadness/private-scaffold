import React, { Component } from 'react';

class Comp2 extends Component {
  componentDidMount() {
    console.log('Comp2DidMount');
  }

  render() {
    return (
      <h2>
        这也是个引用了React的组件2
      </h2>
    );
  }
}

export default Comp2;
