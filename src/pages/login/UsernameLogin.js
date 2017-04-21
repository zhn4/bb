import React, { Component } from 'react';

import './style/login.css'

// let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据

let  apiSwitch = require('../../apiSwitch')

class UsernameLogin extends Component {
  // constructor() {
  //
  // }
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
            // data.push({
            //   token: json.token,// token，登陆状态
            //   user: json.user// user用户数据
            // })
            // localStorage.setItem('userData', JSON.stringify(data))// localStorage保存token标识登陆状态
            // this.setState({
            //   isLogin: true,
            //   userData: json.user
            // })
            this.props.handleLoginStatus(json.token, json.user)
          })
        }else {
          res.json()
          .then(json => {
            console.log(json.non_field_errors[0])
          })
        }
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
        <button className="btn" onClick={this.usernameLogin.bind(this)}>登陆</button>
      </div>
    )
  }
}

export default UsernameLogin;
