import React, { Component } from 'react';


import Results from '../components/Results'
import Back from '../components/Back'

import './style/library.css'

let  apiSwitch = require('../../apiSwitch')

let historyData = []// 测试数据

class LibrarySearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultData: historyData,
      title: '搜索结果'
    }
  }
  componentWillMount() {
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      fetch(apiSwitch() + '/api/tsgbooks/books/?search=' + this.props.match.params.key, {
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
            setTimeout(() => {
              this.setState({
                resultData: json.results,
                login: true
              })
            }, 400)
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
  componentDidMount() {
    this.setState({
      height: window.innerHeight - 55 - 58
    })
  }
  render() {
    return (
      <div className="library">
        <Back title={this.state.title}/>

        {(() => {
          switch (this.state.login) {
            case true: return <Results data={this.state.resultData} height={this.state.height}/>
            case false: return <div className="login-tips">请登陆</div>
            default: return <div className="login-tips">加载中...</div>
          }
        })()}

      </div>
    );
  }
}

export default LibrarySearchResults;
