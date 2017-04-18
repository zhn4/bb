import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import Search from '../components/Search'
import Results from '../components/Results'

import './library.css'

let historyData = []// 测试数据
for(let i = 0; i < 50; i++) {
  historyData.push({
    icon: 'https://img3.doubanio.com/lpic/s2449523.jpg',
    title: '倚天屠龙记'
  })
}

let  apiSwitch = require('../../apiSwitch')

class Library extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: false,
      searchResults: historyData
    }
  }
  getInputValue(value) {
    console.log('搜索功能，发送ajax')
    console.log(value)
    fetch(apiSwitch() + '/api/tsgbooks/books/?search=' + value, {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(json)
          this.setState({
            results: true,
            searchResults: json
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
        <Search getInputValue={this.getInputValue.bind(this)}/>
        {
          this.state.results
          ?
          <Results data={this.state.searchResults}/>
          :
          <Classification/>
        }
      </div>
    );
  }
}

class Classification extends Component {
  render() {
    return (
      <div className="classification">
        <Link to="/libraryclass/1"></Link>
        <Link to="/libraryclass/2"></Link>
        <Link to="/libraryclass/3"></Link>
      </div>
    )
  }
}

export default Library;
