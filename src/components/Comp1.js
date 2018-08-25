import React, { Component } from 'react';
import Test2 from '../utils/Test2';

console.log(Test2);

class Comp1 extends Component {
  componentDidMount() {
    console.log('Comp1DidMount');
  }

  render() {
    return (
      <h2>这也是个引用了React的组件</h2>
    );
  }
}

export default Comp1;
