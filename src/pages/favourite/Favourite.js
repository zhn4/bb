import React, { Component } from 'react';

import Results from '../components/Results'
import Back from '../components/Back'

let  apiSwitch = require('../../apiSwitch')

let page = 2

class Favourite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }
  componentWillMount() {
    fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/', {
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
    fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/?page='
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
          let newResultData = this.state.data
          json.results.map( (index)=> (
            newResultData.push(index)
          ))
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
          this.state.data
          ?
          <Results data={this.state.data} loadMoreData={this.loadMoreData.bind(this)}/>
          :
          ''
        }
      </div>
    )
  }
}

export default Favourite;
