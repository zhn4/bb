import React, { Component } from 'react';
// import { HashRouter as Router, Route,  Link } from 'react-router-dom'

import './style/history.css'

import Results from '../components/Results'
import Back from '../components/Back'

let  apiSwitch = require('../../apiSwitch')

let historyData = []// 测试数据
// for(let i = 0; i < 50; i++) {
//   historyData.push({
//     icon: 'https://img3.doubanio.com/lpic/s2449523.jpg',
//     title: '倚天屠龙记'
//   })
// }
// console.log(historyData)

let page = 2

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
    fetch(apiSwitch() + '/api/tsgbooks/member_books/', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
      },
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(json)
          this.setState({
            historyData: json.results
          })
        })
      }else {
        res.json()
        .then(json => {
          console.log("gg")
        })
      }
    })
    .catch(function(error) {
      console.log('error', error)
    })
  }
  loadMoreData(value) {
    console.log('加载更多')
    fetch(apiSwitch() + '/api/tsgbooks/member_books/?page='
    + page + '/', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
      },
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(this.state.resultData)
          console.log(json)
          page ++// 注意页数增加
          let newResultData = this.state.historyData
          json.results.map( (index)=> (
            // console.log(index)
            newResultData.push(index)
          ))
          this.state.historyData.push(json.results)
          console.log(this.state.historyData)
          this.setState({
            historyData: newResultData
          })
        })
      }else {
        res.json()
        .then(json => {
          console.log("gg")
        })
      }
    })
    .catch(function(error) {
      console.log('error', error)
    })
  }
  render() {
    return (
      <div className="history">
        <Back title={this.state.title}/>
        <Results data={this.state.historyData} loadMoreData={this.loadMoreData.bind(this)}/>
      </div>
    );
  }
}

export default History;
