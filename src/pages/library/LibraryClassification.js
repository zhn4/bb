import React, { Component } from 'react';

import Results from '../components/Results'
import Back from '../components/Back'

import './style/library.css'

let  apiSwitch = require('../../apiSwitch')

let page = 2

let historyData = []// 测试数据

class LibraryClassification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultData: historyData
    }
  }
  componentWillMount() {
    this.setState({
      login: true
    })
    page = 2
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      fetch(apiSwitch() + '/api/tsgbooks/books/?sort=' + this.props.match.params.id, {
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
              resultData: json.results
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
    }else {
      this.setState({
        login: false
      })
    }
  }
  loadMoreData(value) {
    fetch(apiSwitch() + '/api/tsgbooks/books/?sort='
    + this.props.match.params.id + '&page_size=30&page=' + page, {
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
          let newResultData = this.state.resultData
          json.results.map( (index)=> (
            newResultData.push(index)
          ))
          this.setState({
            resultData: newResultData
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
      <div className="library">
        <Back/>

        {(() => {
          switch (this.state.login) {
            case true: return <Results data={this.state.resultData} loadMoreData={this.loadMoreData.bind(this)}/>
            case false: return <div className="login-tips">请登陆</div>
            default: return <div>加载中...</div>
          }
        })()}

      </div>
    );
  }
}

export default LibraryClassification;
