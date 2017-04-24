import React, { Component } from 'react';

import Results from '../components/Results'
import Back from '../components/Back'

let  apiSwitch = require('../../apiSwitch')

let historyData = []// 测试数据
for(let i = 0; i < 50; i++) {
  historyData.push({
    icon: 'https://img3.doubanio.com/lpic/s2449523.jpg',
    title: '倚天屠龙记'
  })
}

let page = 2

class Favourite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: historyData
    }
  }
  componentWillMount() {
    fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/', {
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
            data: json.results
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
    fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/?page='
    + page, {
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
          console.log(this.state.resultData)
          console.log(json)
          page ++// 注意页数增加
          let newResultData = this.state.data
          json.results.map( (index)=> (
            // console.log(index)
            newResultData.push(index)
          ))
          // this.state.resultData.push(json.results)
          console.log(this.state.data)
          this.setState({
            data: newResultData
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
      <div className="favourite">
        <Back/>
        {
          <Results data={this.state.data} loadMoreData={this.loadMoreData.bind(this)}/>
        }
      </div>
    )
  }
}

export default Favourite;
