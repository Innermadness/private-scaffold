import React, { Component } from 'react';
import styles from './App.less';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';

class App extends Component {
  componentDidMount() {
    console.log('AppDidMount');
  }

  render() {
    return (
      <div className={styles.title}>
        Hello, world!
        <Comp1 />
        <Comp2 />
      </div>
    );
  }
}

export default App;
