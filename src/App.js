import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import styles from './App.less';
import Comp1 from './components/Comp1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      requestResult: ''
    };
    console.log(process.env.NODE_ENV);
  }

  componentDidMount() {
    console.log('AppDidMount');
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
      <div className={styles.camelTitle}>
        Hello, world!
        <Comp1 />
        <p>{requestResult}</p>
      </div>
    );
  }
}

export default hot(module)(App); // 对于react，HMR要使用特殊的包
