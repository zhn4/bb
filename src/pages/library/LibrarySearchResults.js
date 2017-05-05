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
  }
  render() {
    return (
      <div className="library">
        <Back title={this.state.title}/>
        <Results data={this.state.resultData}/>
      </div>
    );
  }
}

export default LibrarySearchResults;
