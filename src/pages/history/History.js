import React, { Component } from 'react';

import './style/history.css'

import Results from '../components/Results'
import Back from '../components/Back'

let  apiSwitch = require('../../apiSwitch')

let historyData = []// 测试数据

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
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
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
        if(res.ok) {
          res.json()
          .then(json => {
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
  }
  loadMoreData(value) {
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
      if(res.ok) {
        res.json()
        .then(json => {
          page ++// 注意页数增加
          let newResultData = this.state.historyData
          json.results.map( (index)=> (
            newResultData.push(index)
          ))
          this.state.historyData.push(json.results)
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
