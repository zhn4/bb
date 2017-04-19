import React, { Component } from 'react';


import Results from '../components/Results'
import Back from '../components/Back'

import './library.css'

let  apiSwitch = require('../../apiSwitch')

let historyData = []// 测试数据
// for(let i = 0; i < 50; i++) {
//   historyData.push({
//     icon: 'https://img3.doubanio.com/lpic/s2449523.jpg',
//     title: '倚天屠龙记'
//   })
// }

class LibrarySearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultData: historyData
    }
  }
  componentWillMount() {
    console.log(this.props.match.params.key)
    fetch(apiSwitch() + '/api/tsgbooks/books/?search=' + this.props.match.params.key, {
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
    // console.log(this.props)
    return (
      <div className="library">
        <Back/>
        <Results data={this.state.resultData}/>
      </div>
    );
  }
}

export default LibrarySearchResults;
