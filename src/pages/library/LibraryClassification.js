import React, { Component } from 'react';

import Results from '../components/Results'
import Back from '../components/Back'

import './style/library.css'

import apiSwitch from '../../apiSwitch'

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
    page = 2
    // if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      fetch(apiSwitch() + '/api/tsgbooks/books/?sort=' + this.props.match.params.id, {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(json => {
            // console.log(json)
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
    // }else {
    //   this.setState({
    //     login: false
    //   })
    // }
  }
  componentDidMount() {
    this.setState({
      height: window.innerHeight - 55 - 30 - this.refs.banner.clientHeight
    })
  }
  loadMoreData(value) {
    fetch(apiSwitch() + '/api/tsgbooks/books/?sort='
    + this.props.match.params.id + '&page_size=30&page=' + page, {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
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
      <div className="library libraryClassResults">
        <Back/>

        {(() => {
          switch (this.props.match.params.id) {
            case '1': return <div ref="banner" className="banner one"></div>
            case '2': return <div ref="banner" className="banner two"></div>
            case '3': return <div ref="banner" className="banner three"></div>
            case '4': return <div ref="banner" className="banner four"></div>
            default: return  ''
          }
        })()}

        {(() => {
          switch (this.state.login) {
            case true: return <Results data={this.state.resultData} loadMoreData={this.loadMoreData.bind(this)} height={this.state.height}/>
            case false: return <div className="login-tips">请登录</div>
            default: return <div className="login-tips">加载中...</div>
          }
        })()}

      </div>
    );
  }
}

export default LibraryClassification;
