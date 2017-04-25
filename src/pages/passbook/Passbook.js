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
      consumeData: []
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
    let today = new Date()
    // /api/tsgbooks/member_book_tracks/
    fetch(apiSwitch() +
    '/api/tsgbooks/member_book_tracks/' + today.getFullYear() +'/' + (today.getMonth() + 1) + '/?service_consume__member=' +
    // this.props.history.service_consume__member, {
    localStorage.getItem('switchSon') + '/', {
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
          json.map((data, i) => {
            data.service_consume.return_date = this.handleTime(data.service_consume.borrow_date)
          })
          this.setState({
            consumeData: json
          })
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
  handleTime(time) {
    // console.log(time)
    if(time.match(/^\d{4}[-]\d{1,2}[-]\d{2}$/)) {
      let d = new Date()
      d.setFullYear(time.split('-')[0], time.split('-')[1] - 1, time.split('-')[2])
      let newDate = this.addSevenDay('d', 7, d);
      let newTime = newDate.toLocaleDateString()
      return newTime.replace(/\//g, '-')
    }
  }
  componentDidMount() {
    this.judgeLogin()
    // console.log(this.props.history.service_consume__member)
    console.log(this.handleAward(123))
  }
  componentWillReceiveProps() {
    this.judgeLogin()
  }
  handleAward(number) {
    console.log('领取礼物，发ajax')
    return number
  }
  addSevenDay(interval, number, date) {
    switch (interval) {
      case "d ": {
        date.setDate(date.getDate() + number);
        return date
        break
      }
      default: {
        date.setDate(date.getDate() + number)
        return date
        break
      }
    }
  }
  handleAjax(year, month) {
    // let today = new Date()
    fetch(apiSwitch() + '/api/tsgbooks/member_book_tracks/' + year +'/' + month +
    '/?service_consume__member=' + localStorage.getItem('switchSon') + '/', {
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
          json.map((data, i) => {
            data.service_consume.return_date = this.handleTime(data.service_consume.borrow_date)
          })
          this.setState({
            consumeData: json
          })
          console.log('数据在这哦里')
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
  prevData(year, month) {
    console.log('加载上一月数据')
    this.handleAjax(year, month)
  }
  nextData(year, month) {
    console.log('加载下一月数据')
    this.handleAjax(year, month)
  }
  render() {
    return (
      <div className="passbook">
        <div className="load-history">
          <Link to="/history"></Link>
        </div>

        <Calendar prevData={this.prevData.bind(this)} nextData={this.nextData.bind(this)}/>
        <div className="record" ref="pbscrollview">
        {
          this.state.isLogin
          ?
            <ConsumeHistory data={this.state.consumeData}/>
          :
          <div className="lead-btn">
            <div className="tips no-login-tips">
              <div>登陆查看宝宝借书记录</div>
              <div>0</div>
            </div>
            <Link className="btn" to="/login">登陆</Link>
          </div>
        }
        </div>
      </div>
    );
  }
}

class ConsumeHistory extends Component {
  render() {
    return (
      <div>
        {this.props.data.map((data, i) => (
          <div key={i}>
            <Tips slogan={data.award.slogan}
                  borrow_date={data.service_consume.borrow_date}
                  count={data.count}
                  return_date={data.service_consume.return_date}
            />
            <Readingbooks member_book={data.service_consume.member_book}/>
            <div className="lead-btn">
            <Link className="btn" to={"/readinggroup/" + data.service_consume.id}>绘本阅读</Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

// 是否满足条件领取奖励
// 领取阅读奖励需要绑定onClick事件触发ajax
// 领取后改变提示文字
// class Award extends Component {
//   render() {
//     return (
//       <div className="award">
//         <div onClick={this.props.handleAward}>领取阅读奖励</div>
//       </div>
//     )
//   }
// }

// 借书次数
// 时间
// 多少本书（借书次数 x 3）
class Tips extends Component {
  render() {
    return (
      <div className="tips">
        <div>{this.props.slogan}</div>
        <div>{this.props.borrow_date} ~ {this.props.return_date}</div>
        <div>{this.props.count}</div>
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
        {this.props.member_book.map((book, i) => (
          <div key={i}>
            <div>
              <img src={book.icon} alt="cover"/>
            </div>
            <div>{book.title}</div>
          </div>
        ))}
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


export default Passbook;
