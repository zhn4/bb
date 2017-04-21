import React, { Component } from 'react';
// import { HashRouter as Router, Route,  Link } from 'react-router-dom'

import './style/history.css'

import Results from '../components/Results'
import Back from '../components/Back'

let historyData = []// 测试数据
for(let i = 0; i < 50; i++) {
  historyData.push({
    icon: 'https://img3.doubanio.com/lpic/s2449523.jpg',
    title: '倚天屠龙记'
  })
}
// console.log(historyData)

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyData: historyData,
      title: '历史借书'
    }
  }
  componentWillMount() {
    console.log('获取阅读过的书籍，发送ajax')
  }
  render() {
    return (
      <div className="history">
        <Back title={this.state.title}/>
        <Results data={this.state.historyData} />
      </div>
    );
  }
}

export default History;
