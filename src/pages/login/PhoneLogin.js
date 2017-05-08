import React, { Component } from 'react';

import './style/login.css'

let  apiSwitch = require('../../apiSwitch')

class PhoneLogin extends Component {
  phoneLogin() {
    if(this.refs.inputPhone.value !== '' && this.refs.verificationCode.value !== '') {
      console.log('非空，可发送请求')
      fetch(apiSwitch() + '/auth/login/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: this.refs.inputPhone.value,
          verification_code: this.refs.verificationCode.value
        })
      })
      .then(res => {
        console.log(res)
        if(res.ok) {
          res.json()
          .then(json => {
            console.log(json)
            console.log(json.token)
            this.props.handleLoginStatus(json.token, json.user)
          })
        }else {
          res.json()
          .then(json => {
            console.log(json.non_field_errors[0])
            alert('验证码错误或失效，请稍后再试！')
          })
        }
      })
      .catch(function(error) {
        console.log('error', error)
      })
    }else {
      alert('验证码不能为空！')
    }
  }
  getCode() {
    console.log('这里应该发送一个ajax请求')
    if(this.refs.inputPhone.value !== '') {
      console.log('获取验证码')
      fetch(apiSwitch() + '/auth/login/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: this.refs.inputPhone.value,
        })
      })
      .then(res => {
        console.log(res)
        res.json().then(json => {
          alert(json.non_field_errors[0])
        })
      })
      .catch(function(error) {
        console.log('error', error)
      })
    }else {
      console.log('空，弹窗提示')
    }
  }
  render() {
    return (
      <div className="phone-login login-part">
        <div>
          <input
            type="text"
            placeholder="请输入手机号"
            ref='inputPhone'
            className="username"
          />
          <input type="button" value="获取验证码"
            onClick={this.getCode.bind(this)}/>
        </div>
        <div>
          <input
            type="text"
            placeholder="请输入验证码"
            ref='verificationCode'
          />
        </div>
        <button className="btn" onClick={this.phoneLogin.bind(this)}>登录</button>
      </div>
    )
  }
}

export default PhoneLogin;
