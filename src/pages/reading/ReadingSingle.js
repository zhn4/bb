import React, { Component } from 'react';

import Back from '../components/Back'

import FaPlay from 'react-icons/lib/fa/play'
import FaStar from 'react-icons/lib/fa/star'
import FaPause from 'react-icons/lib/fa/pause'
import FaShare from 'react-icons/lib/fa/share-square-o'

import apiSwitch from '../../apiSwitch'

import './style/reading.css'

let showTime

class ReadingSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookInfo: [],
      audioStatus: false,
      audioCurrentTime: '00:00',
      tags: [],
      is_favor: false
    }
  }
  componentWillMount() {
    if(localStorage.getItem('userData') && localStorage.getItem('userData') !== '') {
      // alert('有数据，发送带token的数据')
      fetch(apiSwitch() + '/api/tsgbooks/books/' + this.props.match.params.book_id + '/', {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        }
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(json => {
            // console.log(json)
            this.setState({
              bookInfo: json,
              is_favor: json.is_favor,
              audioCurrentTime: json.duration,
              sort: json.sort.name,
              tags: json.tag
            })
            this.refs.videoPlayer.load()
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
    }else {
      // alert('数据，发送带token的数据')
      fetch(apiSwitch() + '/api/tsgbooks/books/' + this.props.match.params.book_id + '/', {
        mode: 'cors',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        }
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(json => {
            console.log(json)
            this.setState({
              bookInfo: json,
              is_favor: json.is_favor,
              audioCurrentTime: json.duration,
              sort: json.sort.name,
              tags: json.tag
            })
            this.refs.videoPlayer.load()
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
  changeTime(times) {
    // let time = parseInt(this.refs.videoPlayer.duration, 10)
    let time = parseInt(times, 10)
    //分钟
    let minute = time / 60
    let minutes = parseInt(minute, 10)
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    //秒
    let second = time % 60
    let seconds = parseInt(second, 10)
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    let allTime = '' +
    minutes +
    '' +
    ':' +
    '' +
    seconds +
    ''
    return allTime
  }
  videoTime() {
    showTime = setInterval( () => {
      this.setState({
        audioCurrentTime: this.changeTime(this.refs.videoPlayer.currentTime)
      })
    }, 1000)
  }
  playVideo() {
    // this.refs.videoPlayer.load()
    if(this.refs.videoPlayer.currentSrc !== '') {
      if(this.refs.videoPlayer.paused) {
        this.refs.videoPlayer.play()
        // this.videoTime()
        setInterval( () => {
          this.setState({
            audioCurrentTime: this.changeTime(this.refs.videoPlayer.currentTime)
          })
        }, 1000)
        this.setState({
          audioStatus: true
        })
      }else {
        this.refs.videoPlayer.pause()
        window.clearInterval(showTime)
        this.setState({
          audioStatus: false
        })
      }
    }else {
      alert('绘本故事音频即将上线，谢谢您的支持！ ')
    }
  }
  audioEnd() {
    console.log('end')
    window.clearInterval(showTime)
    this.setState({
      audioStatus: false,
      audioCurrentTime: '00:00'
    })
  }
  handleFavourite() {
    if(this.state.is_favor) {
      fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/' + this.props.match.params.book_id + '/', {
        mode: 'cors',
        method: 'DELETE',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        }
      })
      .then(res => {
        if(res.ok) {
          this.setState({
            is_favor: false
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
    }else {
      fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        },
        body: JSON.stringify({
          book: this.props.match.params.book_id
        })
      })
      .then(res => {
        if(res.ok) {
          res.json()
          .then(json => {
            this.setState({
              is_favor: true
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
  alertTips() {
    alert('请登录后操作，谢谢！')
  }
  render() {
    return (
      <div className="reading">
        <Back onClick={window.clearInterval(showTime)}/>
        <div className="cover">
          <img src={this.state.bookInfo.cover} alt="cover"/>
          <p>{this.state.bookInfo.title}</p>
        </div>
        <div className="tags">
          <ul>
              <li>{this.state.sort}</li>
            {this.state.tags.map((data, i) => (
              <li key={i}>{data.name}</li>
            ))}
          </ul>
        </div>
        <div className="desc">{this.state.bookInfo.content}</div>
        <div>
          <audio controls="controls" id="video-player" ref="videoPlayer"
            onEnded={this.audioEnd.bind(this)}
          >
            <source src={this.state.bookInfo.audio} type="audio/mp3" />
          </audio>
        </div>
        <div className="reading-nav">
          <div>
            <div><FaShare size={28}/></div>
          </div>
          <div className="active" data-value={this.state.audioCurrentTime}
            onClick={this.playVideo.bind(this)}
          >
            <div>
              {
                this.state.audioStatus
                ?
                <FaPause size={28}/>
                :
                <FaPlay size={28}/>
              }
            </div>
          </div>
          {
            localStorage.getItem('userData')
            ?
            <div className={this.state.is_favor ? 'star' : 'unstar'} onClick={this.handleFavourite.bind(this)}>
              <div><FaStar size={28}/></div>
            </div>
            :
            <div className="unstar" onClick={this.alertTips.bind(this)}>
              <div><FaStar size={28}/></div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ReadingSingle;
