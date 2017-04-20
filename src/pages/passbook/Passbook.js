import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Calendar from '../calendar/Calendar'

// import GoHistory from 'react-icons/lib/go/history'

import './style/passbook.css'

// let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据

class Passbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  judgeLogin() {
    let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []
    if(data.length > 0) {
      this.setState({
        isLogin: true
      })
    }
  }
  componentDidMount() {
    this.judgeLogin()
  }
  componentWillReceiveProps() {
    this.judgeLogin()
  }
  handleAward() {
    console.log('领取礼物，发ajax')
  }
  render() {
    return (
      <div className="passbook">
        <div className="load-history">
          <Link to="/history"></Link>
        </div>

        <Calendar/>

        <div className="record">
          <Award handleAward={this.handleAward.bind(this)}/>
          <Tips/>
          <Readingbooks/>
          <LeadBtn isLogin={this.state.isLogin}/>
        </div>

      </div>
    );
  }
}

// 是否满足条件领取奖励
// 领取阅读奖励需要绑定onClick事件触发ajax
// 领取后改变提示文字
class Award extends Component {
  render() {
    return (
      <div className="award">
        <div onClick={this.props.handleAward}>领取阅读奖励</div>
      </div>
    )
  }
}

// 借书次数
// 时间
// 多少本书（借书次数 x 3）
class Tips extends Component {
  render() {
    return (
      <div className="tips">
        <div>第1次借书，好棒！</div>
        <div>4月16日 ~ 4月30日</div>
        <div>321</div>
      </div>
    )
  }
}

// 数组数据：封面，书名
class Readingbooks extends Component {
  render() {
    return (
      <div className="reading-books">
        <div>
          <div>
            <img src="" alt="cover"/>
          </div>
          <div>书名</div>
        </div>
      </div>
    )
  }
}

// 判断状态显示按钮
// @params isLogin
class LeadBtn extends Component {
  render() {
    return (
      <div className="lead-btn">
        {
          this.props.isLogin
          ?
          <Link className="btn" to="/readingsingle">绘本阅读</Link>
          :
          <Link className="btn" to="/login">登陆</Link>
        }
      </div>
    )
  }
}

export default Passbook;
