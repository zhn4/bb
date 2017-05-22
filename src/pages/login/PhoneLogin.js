import React, { Component } from 'react';
import notie from 'notie'

import './style/login.css'
import '../../../node_modules/notie/dist/notie.css'

import apiSwitch from '../../apiSwitch'

let min = 60

let judgeTime

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
        // console.log(res)
        if(res.ok) {
          res.json()
          .then(json => {
            // console.log(json)
            // console.log(json.token)
            this.props.handleLoginStatus(json.token, json.user)
            clearInterval(judgeTime)
            min = 60
          })
        }else {
          res.json()
          .then(json => {
            console.log(json.non_field_errors[0])
            // alert('验证码错误或失效，请稍后再试！')
            notie.alert({
              type: 'error',
              text: '验证码错误或失效，请稍后再试！',
              stay: false,
              time: 2,
              position: 'top'
            })
          })
        }
      })
      .catch(function(error) {
        console.log('error', error)
      })
    }else {
      // alert('手机号码或验证码不能为空！')
      notie.alert({
        type: 'error',
        text: '手机号码或验证码不能为空！',
        stay: false,
        time: 2,
        position: 'top'
      })
    }
  }
  getCode() {
    if(this.refs.inputPhone.value !== '' && this.refs.inputPhone.value.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/)) {
      console.log('获取验证码')
      // let judgeTime = setInterval(() => {
      judgeTime = setInterval(() => {
        if(min < 0) {
          clearInterval(judgeTime)
          this.refs.getcodeBtn.removeAttribute('disabled', 'disabled')
          this.refs.getcodeBtn.innerHTML = '获取验证码'
          min = 60
        }else {
          this.refs.getcodeBtn.setAttribute('disabled', 'disabled')
          this.refs.getcodeBtn.innerHTML = min-- + '秒'
        }
      }, 1000)
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
        res.json().then(json => {
          // alert(json.non_field_errors[0])
          notie.alert({
            type: 'success',
            text: json.non_field_errors[0],
            stay: false,
            time: 2,
            position: 'top'
          })
        })
      })
      .catch(function(error) {
        console.log('error', error)
      })
    }else {
      // alert('请输入正确的手机格式！')
      notie.alert({
        type: 'error',
        text: '请输入正确的手机格式！',
        stay: false,
        time: 2,
        position: 'top'
      })
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
          <button className="getcode-btn"
                  onClick={this.getCode.bind(this)}
                  ref="getcodeBtn">获取验证码</button>
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
