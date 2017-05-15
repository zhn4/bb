import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Calendar from '../calendar/Calendar'

let apiSwitch = require('../../apiSwitch')

import './style/passbook.css'

let today = new Date()
let todyMonth = today.getMonth()

class Passbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      consumeData: [],
      month: todyMonth + 1,
      height: window.innerHeight - 55
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
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      let today = new Date()
      fetch(apiSwitch() + '/api/tsgbooks/member_book_tracks/' + today.getFullYear() +'/' +
      (today.getMonth() + 1) + '/?service_consume__member=' + localStorage.getItem('switchSon'), {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        },
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(json => {
            json.map((data, i) => {
              data.service_consume.return_date = this.handleTime(data.service_consume.borrow_date)
            })
            this.setState({
              consumeData: json,
              borrow_date_array: borrow_date_array
            })
            let borrow_date_array = []
            json.map((data, i) => {
              borrow_date_array.push(data.service_consume.borrow_date)
            })
            this.markBorrowDay(borrow_date_array)
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
  }
  handleTime(time) {
    if(time.match(/^\d{4}[-]\d{1,2}[-]\d{2}$/)) {
      let d = new Date()
      d.setFullYear(time.split('-')[0], time.split('-')[1] - 1, time.split('-')[2])
      let newDate = this.addSevenDay('d', 14, d);
      let newTime = newDate.toLocaleDateString()
      newTime = newTime.replace(/\//g, '-')
      newTime = newTime.split('-')
      if(newTime[1].length < 2) {
        newTime[1] = '0' + newTime[1]
      }
      if(newTime[2].length < 2) {
        newTime[2] = '0' + newTime[2]
      }
      // return newTime[0] + '-' + newTime[1] + '-' + newTime[2]
      return '截止日期:' + newTime[1] + '-' + newTime[2]
    }
  }
  markBorrowDay(borrow_date_array) {
    let days = document.getElementsByClassName('days')
    for(let i = 0; i < days.length; i++) {
      days[i].classList.remove('borrow_day')
      for(let j = 0; j < borrow_date_array.length; j++) {
        if(days[i].getAttribute('data-date') === borrow_date_array[j]) {
          days[i].classList.add('borrow_day')
        }
      }
    }
  }
  componentDidMount() {
    this.judgeLogin()
  }
  componentWillReceiveProps() {
    this.judgeLogin()
  }
  sendArray() {
    console.log('change state, send arr')
  }
  // handleAward(number) {
  //   console.log('领取礼物，发ajax')
  //   return number
  // }
  addSevenDay(interval, number, date) {
    switch (interval) {
      case "d ": {
        date.setDate(date.getDate() + number);
        return date
      }
      default: {
        date.setDate(date.getDate() + number)
        return date
      }
    }
  }
  handleAjax(year, month) {
    fetch(apiSwitch() + '/api/tsgbooks/member_book_tracks/' + year +'/' + (month + 1) +
    '/?service_consume__member=' + localStorage.getItem('switchSon'), {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(json => {
          json.map((data, i) => {
            data.service_consume.return_date = this.handleTime(data.service_consume.borrow_date)
          })
          this.setState({
            consumeData: json
          })
          let borrow_date_array = []
          json.map((data, i) => {
            borrow_date_array.push(data.service_consume.borrow_date)
          })
          this.markBorrowDay(borrow_date_array)
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
  prevData(year, month) {// 上一个月
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      this.handleAjax(year, month)
    }
  }
  nextData(year, month) {// 下一个月
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      this.handleAjax(year, month)
    }
  }
  handleMonth(month) {// 日历翻动，处理左上角的日期
    this.setState({
      month: month
    })
  }
  render() {
    return (
      <div className="passbook" style={{'height': this.state.height + 'px'}}>
        <div className="load-history">
          <Link to="/history"></Link>
        </div>

        {(() => {
          switch (this.state.month) {
            case 1: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/1.png')} alt="0"/>
              </div>
            )
            case 2: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/2.png')} alt="0"/>
              </div>
            )
            case 3: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/3.png')} alt="0"/>
              </div>
            )
            case 4: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/4.png')} alt="0"/>
              </div>
            )
            case 5: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/5.png')} alt="0"/>
              </div>
            )
            case 6: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/6.png')} alt="0"/>
              </div>
            )
            case 7: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/7.png')} alt="0"/>
              </div>
            )
            case 8: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/8.png')} alt="0"/>
              </div>
            )
            case 9: return (
              <div className="month">
                <img src={require('./img/0.png')} alt="0"/>
                <img src={require('./img/9.png')} alt="0"/>
              </div>
            )
            case 10: return (
              <div className="month">
                <img src={require('./img/1.png')} alt="0"/>
                <img src={require('./img/0.png')} alt="0"/>
              </div>
            )
            case 11: return (
              <div className="month">
                <img src={require('./img/1.png')} alt="0"/>
                <img src={require('./img/1.png')} alt="0"/>
              </div>
            )
            case 12: return (
              <div className="month">
                <img src={require('./img/1.png')} alt="0"/>
                <img src={require('./img/2.png')} alt="0"/>
              </div>
            )
            default: return ''
          }
        })()}

        <Calendar
          prevData={this.prevData.bind(this)}
          nextData={this.nextData.bind(this)}
          handleMonth={this.handleMonth.bind(this)}
        />
        <div className="record" ref="pbscrollview">
        {
          this.state.isLogin
          ?
          <ConsumeHistory data={this.state.consumeData}/>
          :
          <div className="lead-btn">
            <div className="tips no-login-tips">
              <div>登录查看宝宝借书记录</div>
              <div>0</div>
            </div>
            <Link className="btn" to="/login">登录</Link>
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
      {
        this.props.data.length > 0
        ?
        <div>
          {this.props.data.map((data, i) => (
            <div key={i}>
              <Tips slogan={data.award.slogan}
                    borrow_date={(() => {
                      return '借书日期:' +
                              data.service_consume.borrow_date.split('-')[1] + '-' +
                              data.service_consume.borrow_date.split('-')[2]
                    })()}
                    count={data.count}
                    return_date={data.service_consume.return_date}
              />
              <Readingbooks member_book={data.service_consume.member_book}/>
              <div className="lead-btn">
              <Link className="btn" to={"/readinggroup/" + data.service_consume.id}>绘本导读</Link>
              </div>
            </div>
          ))}
        </div>
        :
        <div>
          <div className="warnning">快去贝贝猴童书馆借阅绘本，<br/>让小朋友养成读书的好习惯！</div>
        </div>
      }
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
        <div>{this.props.slogan}</div>
        <div>{this.props.borrow_date} ~ {this.props.return_date}</div>
        <div>{this.props.count}</div>
      </div>
    )
  }
}

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

export default Passbook;
