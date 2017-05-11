import React, { Component } from 'react';

import PhoneLogin from './PhoneLogin'
import UsernameLogin from './UsernameLogin'

import './style/login.css'

import RightArrow from 'react-icons/lib/fa/angle-right'
import Refresh from 'react-icons/lib/fa/refresh'

let  apiSwitch = require('../../apiSwitch')

import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,// 默认非登录状态
      userData: [],// 用户数据
      phoneLogin: true,
      usernameLogin: false,
      height: window.innerHeight - 55
    }
  }
  componentWillMount() {
    // TODO 需要加入fetch请求判断token是否失效
    let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据
    if(data[0]) {
      this.setState({// 存在localStorage数据就读取
        isLogin: true,
        userData: data[0].user
      })
      let son = localStorage.getItem('switchSon') ? parseInt(localStorage.getItem('switchSon'), 10) : 1
      this.setState({
        userDetailsInfo: JSON.parse(localStorage.getItem('my-menbers')),
        currentSon: son
      })
    }
  }
  logout() {
    console.log('退出，清除localStorage，发送退出请求')
    localStorage.setItem('userData', [])// localStorage保存token标识登录状态
    localStorage.setItem('switchSon', '')
    this.setState({
      isLogin: false,
      userData: [],
      userDetailsInfo: null
    })
  }
  handleLoginStatus(token, userInfo) {// 处理登录状态
    let data = []
    data.push({
      token: token,// token，登录状态
      user: userInfo// user用户数据
    })
    localStorage.setItem('userData', JSON.stringify(data))// localStorage保存token标识登录状态
    this.setState({
      isLogin: true,
      userData: userInfo
    })
    this.getUserDetailsInfo(token)
  }
  getUserDetailsInfo(token) {// 获取该账号下的子账号
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
          <div className="after" style={{'height': this.state.height + 'px'}}>
            <div>
              <span className="title">账号</span>
              {this.state.userData.username}
            </div>
            {this.state.userDetailsInfo
            ?
            <div onClick={this.changeSon.bind(this)}>
              <span className="title">名称</span>
              {this.state.userDetailsInfo[this.state.currentSon - 1].name}
              {
                this.state.userDetailsInfo.length < 2
                ?
                ''
                :
                <span className="btns" ><Refresh/></span>
              }
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
                <span className="title">分店电话</span>
                {this.state.userDetailsInfo[this.state.currentSon - 1].shop[0].phone}
              </div>
              :
              ''
            }
            <div>
              <Link to="/favourite">
                <span className="title">藏书</span>收藏的故事都在这里！<span><RightArrow/></span>
              </Link>
            </div>
            <div>
              <Link to="/about">
                <span className="title">关于</span>贝贝猴童书馆<span><RightArrow/></span>
              </Link>
            </div>
            <button onClick={this.logout.bind(this)}>退出</button>
          </div>
          :
          <div className="before">
            <div className="logo"></div>

            {
              this.state.phoneLogin
              ?
              <PhoneLogin handleLoginStatus={this.handleLoginStatus.bind(this)}/>
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
            {
              this.state.loginmethodFunction
              ?
              <ul className="loginBtn" onClick={this.loginMethods.bind(this)}>
                <li><div className="phone">手机登录</div></li>
                <li><div className="username">账号登录</div></li>
              </ul>
              :
              ''
            }
          </div>
        }
      </div>
    );
  }
}

export default Login;
