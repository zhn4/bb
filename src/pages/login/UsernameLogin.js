import React, { Component } from 'react';

import './style/login.css'

let  apiSwitch = require('../../apiSwitch')

class UsernameLogin extends Component {
  usernameLogin() {
    if(this.refs.inputUsername.value !== '' && this.refs.inputPwd.value !== '') {
      console.log('非空，可发送请求')
      fetch(apiSwitch() + '/auth/login/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.refs.inputUsername.value,
          password: this.refs.inputPwd.value
        })
      })
      .then(res => {
        console.log(res)
        if(res.ok) {
          res.json()
          .then(json => {
            console.log(json)
            console.log(json.token)
            this.props.handleLoginStatus(json.token, json.user)// 成功登录后调用父页面的handleLoginStatus，发送token，用户信息过去
          })
        }else {
          res.json()
          .then(json => {
            console.log(json.non_field_errors[0])
            alert('账号或密码错误，请稍后再试！')
          })

        }
      })
      .catch(function(error) {
        console.log('error', error)
      })
    }else {
      alert('密码不能为空！')
    }
  }
  render() {
    return (
      <div className="username-login login-part">
        <div>
          <input
            type="text"
            placeholder="请输入账号"
            ref='inputUsername'
            className="username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="请输入密码"
            ref='inputPwd'
          />
        </div>
        <button className="btn" onClick={this.usernameLogin.bind(this)}>登录</button>
      </div>
    )
  }
}

export default UsernameLogin;
