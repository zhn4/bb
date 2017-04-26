import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Calendar from '../calendar/Calendar'

// import GoHistory from 'react-icons/lib/go/history'

let apiSwitch = require('../../apiSwitch')

import './style/passbook.css'

// let data = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : []// 新建数组读取localStorage是否存在用户数据

// import ImgZero from './img/0.png'
// import ImgOne from './img/1.png'
// import ImgTwo from './img/2.png'
// import ImgThree from './img/3.png'
// import ImgFour from './img/4.png'
// import ImgFive from './img/1.png'
// import ImgSix from './img/1.png'
// import ImgSeven from './img/1.png'
// import ImgEigth from './img/1.png'
// import ImgNine from './img/1.png'

let today = new Date()
let todyMonth = today.getMonth()

class Passbook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      consumeData: [],
      month: todyMonth + 1
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
    if(localStorage.getItem('userData') !== '') {
    // console.log(JSON.parse(localStorage.getItem('userData'))[0].token)
      let today = new Date()
      fetch(apiSwitch() +
      '/api/tsgbooks/member_book_tracks/' + today.getFullYear() +'/' + (today.getMonth() + 1) + '/?service_consume__member=' +
      localStorage.getItem('switchSon') + '/', {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
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
      }
      default: {
        date.setDate(date.getDate() + number)
        return date
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
        'Content-Type': 'application/json',
        'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
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
  handleMonth(month) {
    console.log('切换月份')
    console.log(month)
    this.setState({
      month: month
    })
  }
  render() {
    return (
      <div className="passbook">
        <div className="load-history">
          <Link to="/history"></Link>
        </div>

        {
          this.state.month === 1
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/1.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 2
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/2.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 3
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/3.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 4
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/4.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 5
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/5.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 6
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/6.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 7
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/7.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 8
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/8.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 9
          ?
          <div className="month">
            <img src={require('./img/0.png')} alt="0"/>
            <img src={require('./img/9.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 10
          ?
          <div className="month">
            <img src={require('./img/1.png')} alt="0"/>
            <img src={require('./img/0.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 11
          ?
          <div className="month">
            <img src={require('./img/1.png')} alt="0"/>
            <img src={require('./img/1.png')} alt="0"/>
          </div>
          :
          ''
        }
        {
          this.state.month === 12
          ?
          <div className="month">
            <img src={require('./img/1.png')} alt="0"/>
            <img src={require('./img/2.png')} alt="0"/>
          </div>
          :
          ''
        }

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
            <Link className="btn" to={"/readinggroup/" + data.service_consume.id}>绘本导读</Link>
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
