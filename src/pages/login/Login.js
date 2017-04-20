import React, { Component } from 'react';

import PhoneLogin from './PhoneLogin'
import UsernameLogin from './UsernameLogin'

import './style/login.css'

// let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据

// let  apiSwitch = require('../../apiSwitch')

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
    // if(!this.state.isLogin) {// 判断登陆状态focus登陆框
    //   this.refs.inputUsername.focus()
    // }
  }
  logout() {
    console.log('退出，清除localStorage，发送退出请求')
    localStorage.setItem('userData', [])// localStorage保存token标识登陆状态
    this.setState({
      isLogin: false,
      userData: []
    })
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

            <PhoneLogin/>

            <UsernameLogin/>

          </div>
        }
      </div>
    );
  }
}

export default Login;
