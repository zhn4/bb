import React, { Component } from 'react';

import './login.css'

let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据

let  apiSwitch = require('../../apiSwitch')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,// 默认非登陆状态
      userData: []// 用户数据
    }
  }
  componentWillMount() {
    // TODO 需要加入fetch请求判断token是否失效
    // console.log(data)
    let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据
    if(data[0]) {
      this.setState({// 存在localStorage数据就读取
        isLogin: true,
        userData: data[0].user
      })
    }

  }
  componentDidMount() {
    if(!this.state.isLogin) {// 判断登陆状态focus登陆框
      this.refs.inputUsername.focus()
    }
  }
  login() {
    // fetch('//192.168.1.84:8000/auth/login/', {
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
          data.push({
            token: json.token,// token，登陆状态
            user: json.user// user用户数据
          })
          localStorage.setItem('userData', JSON.stringify(data))// localStorage保存token标识登陆状态
          this.setState({
            isLogin: true,
            userData: json.user
          })
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
  }
  logout() {
    console.log('退出，清除localStorage，发送退出请求')
    localStorage.setItem('userData', [])// localStorage保存token标识登陆状态
    this.setState({
      isLogin: false,
      userData: []
    })
  }
  getCode() {
    console.log('这里应该发送一个ajax请求')
  }
  render() {
    return (
      <div className="login">
        {
          this.state.isLogin
          ?
          <div className="after">
            <p>已经登陆</p>
            <div>昵称：{this.state.userData.username}</div>
            <div>账号：{this.state.userData.email}</div>
            <div>电话号码：{this.state.userData.phone_number}</div>
            <div>切换账号：</div>
            <div>办理分店：</div>
            <button onClick={this.logout.bind(this)}>退出</button>
          </div>
          :
          <div className="before">
            <div>
              留一个banner
            </div>
            <div>
              <input
                type="text"
                placeholder="请输入手机号"
                ref='inputUsername'
                className="username"
              />
              <input type="button" value="获取验证码"
                onClick={this.getCode.bind(this)}/>
            </div>
            <div>
              <input
                type="password"
                placeholder="请输入验证码"
                ref='inputPwd'
              />
            </div>
            <button className="btn" onClick={this.login.bind(this)}>登陆</button>
          </div>
        }
      </div>
    );
  }
}

export default Login;
