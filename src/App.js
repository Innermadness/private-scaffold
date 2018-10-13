import React, { Component } from 'react';
import styles from './App.less';
import Comp1 from './components/Comp1';

// import('./components/Comp1').then(data => {
//   console.log(data);
// });

class App extends Component {
  componentDidMount() {
    console.log('AppDidMount');
  }

  render() {
    return (
      <div className={styles.title}>
        Hello, world!
        <Comp1 />
      </div>
    );
  }
}

export default App;
