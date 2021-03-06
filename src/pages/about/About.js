import React, { Component } from 'react';

import Back from '../components/Back'

import apiSwitch from '../../apiSwitch'

import './style/about.css'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }
  judgePhoneOS() {
    if(navigator.userAgent.match('iPhone')) {
      const platform_id = 1
      return platform_id
    }else if(navigator.userAgent.match('Android')) {
      const platform_id = 2
      return platform_id
    }
  }
  componentWillMount() {
    fetch(apiSwitch() + '/api/tsgapp/app_release_info/' + this.judgePhoneOS() + '/', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(json => {
          this.setState({
            data: json
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
      <div className="about">
        <Back/>
        <div className="logo"></div>
        <div className="desc">
          <div>
            <span>贝贝猴公众号</span>bbmonkeybook
          </div>
          <div>
            <span>客服猴小贝</span>bbmonkey01
          </div>
          <div>
            <span>客服热线</span>020-29845736
          </div>
          <div id="version">
            <span>版本号</span>Ver <span id="show-version">1.0.0</span>
          </div>
        </div>
      </div>
    )
  }
}

export default About
