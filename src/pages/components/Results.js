import React, { Component } from 'react';
// import { HashRouter as Router, Route,  Link } from 'react-router-dom'

// let historyData = []// 测试数据
// for(let i = 0; i < 50; i++) {
//   historyData.push({
//     cover: 'http://blog.roodo.com/book100/3aecf7cc.jpg',
//     name: '倚天屠龙记'
//   })
// }
// console.log(historyData)
import './results.css'

class Results extends Component {
  render() {
    return (
      <div className="results">
        {this.props.data.map((data, i) => (
          <div key={i}>
            <img src={data.icon} alt="cover" />
            <p>{data.title}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Results;
