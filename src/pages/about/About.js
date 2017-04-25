import React, { Component } from 'react';

import Back from '../components/Back'

let  apiSwitch = require('../../apiSwitch')

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
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(json)
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
        <div>
          {this.state.data.rely_version}
        </div>
      </div>
    )
  }
}

export default About
