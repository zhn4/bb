import React, { Component } from 'react';

import PhoneLogin from './PhoneLogin'
import UsernameLogin from './UsernameLogin'


import './style/login.css'

let  apiSwitch = require('../../apiSwitch')

import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,// 默认非登陆状态
      userData: [],// 用户数据
      phoneLogin: false,
      usernameLogin: true
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
      let son = localStorage.getItem('switchSon') ? parseInt(localStorage.getItem('switchSon'), 10) : 1
      // console.log(JSON.parse(localStorage.getItem('my-menbers')))
      this.setState({
        userDetailsInfo: JSON.parse(localStorage.getItem('my-menbers')),
        currentSon: son
      })
    }
  }
  logout() {
    console.log('退出，清除localStorage，发送退出请求')
    localStorage.setItem('userData', [])// localStorage保存token标识登陆状态
    localStorage.setItem('switchSon', '')
    this.setState({
      isLogin: false,
      userData: [],
      userDetailsInfo: null,

    })
  }
  handleLoginStatus(token, userInfo) {
    console.log('chang isLogin')
    let data = []
    data.push({
      token: token,// token，登陆状态
      user: userInfo// user用户数据
    })
    localStorage.setItem('userData', JSON.stringify(data))// localStorage保存token标识登陆状态
    // localStorage.setItem('switchSon', JSON.stringify(1))
    this.setState({
      isLogin: true,
      userData: userInfo
    })
    this.getUserDetailsInfo(token)
  }
  getUserDetailsInfo(token) {
    let son = localStorage.getItem('switchSon') ? parseInt(localStorage.getItem('switchSon'), 10) : 1
    console.log(token)
    fetch(apiSwitch() + '/api/my-members/', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': ' jwt ' + token
      },
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(json)
          this.setState({
            userDetailsInfo: json,
            currentSon: son
          })
          localStorage.setItem('my-menbers', JSON.stringify(json))// 保存账号下子账号数据
          if(localStorage.getItem('switchSon')) {
            return
          }else {
            localStorage.setItem('switchSon', JSON.stringify(this.state.currentSon))
          }
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
  loginMethods(e) {
    console.log(e.target.className)
    if(e.target.className === 'phone') {
      this.setState({
        phoneLogin: true,
        usernameLogin: false
      })
    }else if(e.target.className === 'username'){
      this.setState({
        phoneLogin: false,
        usernameLogin: true
      })
    }
  }
  changeSon() {// 切换儿子
    console.log('切换儿子')
    if(this.state.currentSon === 1) {
      this.setState({
        currentSon: 2
      })
      localStorage.setItem('switchSon', JSON.stringify(2))
    }else if(this.state.currentSon === 2){
      this.setState({
        currentSon: 1
      })
      localStorage.setItem('switchSon', JSON.stringify(1))
    }
  }
  render() {
    return (
      <div className="login">
        {
          this.state.isLogin
          ?
          <div className="after">
            <div>
              <span className="title">昵称</span>
              {this.state.userData.username}
            </div>
            {this.state.userDetailsInfo
            ?
            <div>
              <span className="title">账号</span>
              {this.state.userDetailsInfo[this.state.currentSon - 1].name}
              <span className="btns" onClick={this.changeSon.bind(this)}>切换</span>
            </div>
            :
              ''
            }
            {
              this.state.userDetailsInfo
              ?
              <div>
                <span className="title">办理分店</span>
                {this.state.userDetailsInfo[this.state.currentSon - 1].shop[0].name}
              </div>
              :
              ''
            }
            {
              this.state.userDetailsInfo
              ?
              <div>
                <span className="title">电话号码</span>
                {this.state.userDetailsInfo[this.state.currentSon - 1].shop[0].phone}
              </div>
              :
              ''
            }
            <div>
              <span className="title">藏书</span>收藏的故事都在这里！
              <Link to="/favourite">打开</Link>
            </div>
            <div>
              贝贝猴阅读存折<Link to="/about">关于</Link>
            </div>
            <button onClick={this.logout.bind(this)}>退出</button>
          </div>
          :
          <div className="before">
            <div>
              留一个banner
            </div>

            {
              this.state.phoneLogin
              ?
              <PhoneLogin/>
              :
              ''
            }

            {
              this.state.usernameLogin
              ?
              <UsernameLogin handleLoginStatus={this.handleLoginStatus.bind(this)}/>
              :
              ''
            }
            <ul className="loginBtn" onClick={this.loginMethods.bind(this)}>
              <li><div className="phone">手机登录</div></li>
              <li><div className="username">账号登录</div></li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default Login;
