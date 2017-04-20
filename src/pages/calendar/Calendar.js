import React, { Component } from 'react';

// import './calendar.scss'
import './style/calendar.css'

// let today = new Date()
// let month = today.getMonth()
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

let touch = {}

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      week: ['日', '一', '二', '三', '四', '五', '六'],
      day: ''
    }
  }
  buildCalendar(m) {
    let activeDate = new Date(currentYear, m, 1)
    let year = activeDate.getFullYear();
    let month = activeDate.getMonth();
    let days_arr = []
    let n = 1 - activeDate.getDay();
    if (n === 1) {
      n = -6;
    }
    activeDate.setDate(n)
    for(let i = 1; i <= 42; i++) {
      days_arr.push({
        date: activeDate.getDate(),
        judgeMonth: activeDate.getMonth() !== month ? false : true,
        date_details: year + '-' + (activeDate.getMonth() + 1) + '-' + activeDate.getDate()
      })
      activeDate.setDate(activeDate.getDate() + 1)
    }
    this.setState({
      date: year + '年' + (month + 1) + '月',
      day: days_arr
    })
  }
  componentWillMount() {
    this.buildCalendar(currentMonth)
  }
  componentDidMount() {

  }
  prevBtn() {
    this.buildCalendar(--currentMonth)
  }
  nextBtn() {
    this.buildCalendar(++currentMonth)
  }
  handleClick(e) {
    console.log(e.target)
  }
  start(e) {
    let startX = e.touches[0].clientX
    touch.startX = startX
  }
  move(e) {
    let moveX = e.touches[0].clientX
    touch.moveX = moveX
  }
  end(e) {
    let judge = touch.startX - touch.moveX
    if(judge > 0 && judge > 20) {
      this.nextBtn()
    }else if(judge < 0 && judge < -20)  {
      this.prevBtn()
    }
  }
  render() {
    return (
      <div className="calendar"
          onTouchStart={this.start.bind(this)}
          onTouchMove={this.move.bind(this)}
          onTouchEnd={this.end.bind(this)}
          onClick={this.handleClick.bind(this)}>
        <Head date={this.state.date} prevBtn={this.prevBtn.bind(this)} nextBtn={this.nextBtn.bind(this)}/>
        <Week week={this.state.week}/>
        <Day day={this.state.day}/>
      </div>
    );
  }
}

class Head extends Component {
  prev() {
    this.props.prevBtn()
  }
  next() {
    this.props.nextBtn()
  }
  render() {
    return(
      <div className="head">
        <a onClick={this.prev.bind(this)}>prev</a>
        <span>{this.props.date}</span>
        <a onClick={this.next.bind(this)}>next</a>
      </div>
    )
  }
}

class Week extends Component {
  render() {
    return(
      <div className="week">
        {this.props.week.map((week, i) => (
          <span key={i}>{week}</span>
        ))}
      </div>
    )
  }
}

class Day extends Component {
  render() {
    return(
      <div className="day">
        {this.props.day.map((day, i) => (
          // <span key={i}>{day}</span>
          <span key={i}
          className={day.judgeMonth ? 'this_month' : 'not_this_month'}
          data-date={day.date_details}
          >{day.date}</span>
        ))}
      </div>
    )
  }
}

export default Calendar;
