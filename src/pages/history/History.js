import React, { Component } from 'react';
// import { HashRouter as Router, Route,  Link } from 'react-router-dom'

import './history.css'

let historyData = []// 测试数据
for(let i = 0; i < 50; i++) {
  historyData.push({
    cover: 'http://blog.roodo.com/book100/3aecf7cc.jpg',
    name: '倚天屠龙记'
  })
}
console.log(historyData)

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historyData: historyData
    }
  }
  componentWillMount() {
    console.log('获取阅读过的书籍，发送ajax')
  }
  render() {
    return (
      <div className="history">
        <div >
          {this.state.historyData.map((data, i) => (
            <div key={i}>
              <img src={data.cover} alt="cover" />
              <p>{data.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default History;
