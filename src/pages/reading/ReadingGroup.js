import React, { Component } from 'react';

import Back from '../components/Back'

import FaPlay from 'react-icons/lib/fa/play'
import FaStar from 'react-icons/lib/fa/star'
import FaPause from 'react-icons/lib/fa/pause'
import FaShare from 'react-icons/lib/fa/share-square-o'

import ReactSwipe from 'react-swipes'

import apiSwitch from '../../apiSwitch'

import './style/reading.css'

let showTime

class ReadingGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audioStatus: false,
      audioCurrentTime: '00:00',
      curCard: 0
    }
  }
  componentWillMount() {
    fetch(apiSwitch() + '/api/tsgbooks/books_by_service_consume/'+
    this.props.match.params.service_consume_id + '/', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
      },
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(json => {
          this.setState({// 借书的数据
            bookInfo: json,
            audioCurrentTime: json[0].duration
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
  changeTime(times) {
    let time = parseInt(times, 10)
    let minutes = parseInt(time / 60, 10)//分钟
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    let seconds = parseInt(time % 60, 10)//秒
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    let allTime = '' + minutes + ' : ' + seconds + ''
    return allTime
  }
  videoTime() {
    window.showTime = setInterval( () => {
      this.setState({
        audioCurrentTime: this.changeTime(this.refs.videoPlayer.currentTime)
      })
    }, 1000)
    return this.videoTime()
  }
  playVideo() {
    if(this.refs.videoPlayer.currentSrc && this.refs.videoPlayer.currentSrc !== '') {
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
    window.clearInterval(showTime)
    this.setState({
      audioStatus: false,
      audioCurrentTime: '00:00'
    })
  }
  handleFavourite() {
    if(this.state.bookInfo[this.state.curCard].is_favor) {// 取消
      fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/' + this.state.bookInfo[this.state.curCard].id + '/', {
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
          let bookInfoModifyData = this.state.bookInfo
          bookInfoModifyData[this.state.curCard].is_favor = false
          this.setState({
            bookInfo: bookInfoModifyData
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
    }else {// 收藏
      fetch(apiSwitch() + '/api/tsgbooks/user_favor_books/', {
        mode: 'cors',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ' jwt ' + JSON.parse(localStorage.getItem('userData'))[0].token
        },
        body: JSON.stringify({
          book: this.state.bookInfo[this.state.curCard].id
        })
      })
      .then(res => {
        if(res.ok) {
          let bookInfoModifyData = this.state.bookInfo
          bookInfoModifyData[this.state.curCard].is_favor = true
          this.setState({
            bookInfo: bookInfoModifyData
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
  render() {
    let opt = {
      distance: 200, // 每次移动的距离，卡片的真实宽度
      swTouchend: (ev) => {
        this.setState({
            curCard: ev.newPoint,
            audioStatus: false,
            audioCurrentTime: this.state.bookInfo[ev.newPoint].duration
        })
        this.refs.videoPlayer.load()
      }
    }
    return (
      <div className="reading reading-group">
        <Back />

        {
          this.state.bookInfo
          ?
          <div>
            <section className="demo" id="demo-distance">
              <div className="viewport">
                <div className="flipsnap">
                  <ReactSwipe className="card-slide" options={opt}>
                    {this.state.bookInfo.map((book, i) => (
                      <div className="item" key={i}>
                        <img src={book.cover} alt="cover"/>
                        <p>{book.title}</p>
                      </div>
                    ))}
                  </ReactSwipe>
                </div>
              </div>
            </section>

            <div className="tags">
              <ul>
                <li>{this.state.bookInfo[this.state.curCard].sort.name}</li>
                {this.state.bookInfo[this.state.curCard].tag.map((tag, i) => (
                  <li key={i}>{tag.name}</li>
                ))}
              </ul>
            </div>

            <div className="desc group-desc">{this.state.bookInfo[this.state.curCard].content}</div>

            <div>
              <audio controls="controls" id="video-player" ref="videoPlayer" onEnded={this.audioEnd.bind(this)}>
                <source src={this.state.bookInfo[this.state.curCard].audio} type="audio/mp3" />
              </audio>
            </div>

            <div className="reading-nav">
              <div>
                <div><FaShare size={28}/></div>
              </div>
              <div className="active"
                    data-value={this.state.audioCurrentTime}
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
              <div className={this.state.bookInfo[this.state.curCard].is_favor ? 'star' : 'unstar'}
                onClick={this.handleFavourite.bind(this)}
              >
                <div><FaStar size={28}/></div>
              </div>
            </div>
          </div>
          :
          ''
        }
      </div>
    );
  }
}

export default ReadingGroup;
