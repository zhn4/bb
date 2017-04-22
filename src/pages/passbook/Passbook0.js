import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Calendar from '../calendar/Calendar'

// import GoHistory from 'react-icons/lib/go/history'

let apiSwitch = require('../../apiSwitch')

import './style/passbook.css'

// let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据

class Passbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      consumeData: ''
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
  componentWillMount() {
    // /api/tsgbooks/member_book_tracks/
    fetch(apiSwitch() + '/api/tsgbooks/member_book_tracks/2017/4/?service_consume__member=1', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      console.log(res)
      if(res.ok) {
        res.json()
        .then(json => {
          console.log(json)
          this.setState({
            consumeData: json[0].award
          })
          console.log(this.state.consumeData)
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
// <div className="tips">
//   <div>{data.award.slogan}</div>
//   <div>{data.service_consume.borrow_time} ~ (+7)</div>
//   <div>{data.count}</div>
// </div>

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
// <div className="reading-books">
//   {data.service_consume.member_book.map((book, i) => (
//     <div key={i}>
//       <div>
//         <img src={book.icon} alt="cover"/>
//       </div>
//       <div>{book.title}</div>
//     </div>
//   ))}
// </div>

// 判断状态显示按钮
// @params isLogin
class LeadBtn extends Component {
  render() {
    return (
      <div className="lead-btn">
        {
          this.props.isLogin
          ?
          <Link className="btn" to={"/readinggroup" + this.props.service_consume_id}>绘本阅读</Link>
          :
          <Link className="btn" to="/login">登陆</Link>
        }
      </div>
    )
  }
}

export default Passbook;
