import React, { Component } from 'react';
import axios from 'axios';
import styles from './App.less';
import Comp1 from './components/Comp1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      requestResult: ''
    };
  }

  componentDidMount() {
    console.log('AppDidMount');
    console.log('ready to request');
    axios.get('/mock/test.json').then(res => {
      console.log(res.data);
      if (res.data.code === 200) {
        this.setState({ requestResult: res.data.result.content });
      }
    }).catch(err => {
      console.log(err.message);
    });
  }

  render() {
    const { requestResult } = this.state;
    return (
      <div className={styles.title}>
        Hello, world!!!
        <Comp1 />
        <p>{requestResult}</p>
      </div>
    );
  }
}

export default App;
